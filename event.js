// EventGo Events Page
// All booking and event data is stored in the browser using LocalStorage.

const eventList = [
    {
        id: 101,
        img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80",
        name: "Sunburn Arena",
        description: "📍 Goa, India",
        date: "▦ 12 OCT 2026",
        price: 1099,
        category: "Music",
        venue: "Goa, India",
        dateISO: "2026-10-12",
        availableTickets: 100
    },
    {
        id: 102,
        img: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=600&q=80",
        name: "Lagaan The Musical",
        description: "📍 Mumbai, India",
        date: "▦ 18 OCT 2026",
        price: 1299,
        category: "Theatre",
        venue: "Mumbai, India",
        dateISO: "2026-10-18",
        availableTickets: 100
    },
    {
        id: 103,
        img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
        name: "Delhi Food Festival",
        description: "📍 Delhi, India",
        date: "▦ 20 OCT 2026",
        price: 499,
        category: "Food",
        venue: "Delhi, India",
        dateISO: "2026-10-20",
        availableTickets: 100
    },
    {
        id: 104,
        img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
        name: "Tech Conference",
        description: "📍 Bengaluru, India",
        date: "▦ 25 OCT 2026",
        price: 1499,
        category: "Conferences",
        venue: "Bengaluru, India",
        dateISO: "2026-10-25",
        availableTickets: 100
    },
    {
        id: 105,
        img: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=600&q=80",
        name: "Comedy Night Live",
        description: "📍 Mumbai, India",
        date: "▦ 02 NOV 2026",
        price: 799,
        category: "Comedy",
        venue: "Mumbai, India",
        dateISO: "2026-11-02",
        availableTickets: 100
    },
    {
        id: 106,
        img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
        name: "Art & Painting Workshop",
        description: "📍 Pune, India",
        date: "▦ 03 NOV 2026",
        price: 599,
        category: "Workshops",
        venue: "Pune, India",
        dateISO: "2026-11-03",
        availableTickets: 100
    },
    {
        id: 107,
        img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80",
        name: "Football Match",
        description: "📍 Kolkata, India",
        date: "▦ 08 NOV 2026",
        price: 899,
        category: "Sports",
        venue: "Kolkata, India",
        dateISO: "2026-11-08",
        availableTickets: 100
    },
    {
        id: 108,
        img: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80",
        name: "Modern Art Exhibition",
        description: "📍 Delhi, India",
        date: "▦ 15 NOV 2026",
        price: 699,
        category: "Exhibitions",
        venue: "Delhi, India",
        dateISO: "2026-11-15",
        availableTickets: 100
    }
];

// LocalStorage keys
const EVENTS_KEY = "eventGoEvents";
const BOOKINGS_KEY = "eventGoBookings";
const AVAILABILITY_KEY = "eventGoAvailability";
const BOOKING_COUNTER_KEY = "eventGoBookingCounter";

const eventsGrid = document.getElementById("eventsGrid");
const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const dateInput = document.getElementById("dateInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");
const eventHeading = document.getElementById("eventHeading");
const clearFiltersBtn = document.getElementById("clearFilters");
const ticketContainer = document.getElementById("ticket");
const qtyBadge = document.getElementById("qty");

let selectedCategory = "All";
let bookings = loadBookings();
let availability = loadAvailability();
let currentEvent = null;
let isBookingSubmitting = false;

// ---------- LocalStorage helpers ----------

function readStorage(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
        console.error("Could not read " + key, error);
        return fallback;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Could not save " + key, error);
    }
}

function loadBookings() {
    const saved = readStorage(BOOKINGS_KEY, []);
    return Array.isArray(saved) ? saved : [];
}

function saveBookings() {
    writeStorage(BOOKINGS_KEY, bookings);
}

function loadAvailability() {
    const saved = readStorage(AVAILABILITY_KEY, null);

    if (saved && typeof saved === "object") {
        return saved;
    }

    const initial = {};
    eventList.forEach(function (event) {
        initial[event.id] = event.availableTickets;
    });

    writeStorage(AVAILABILITY_KEY, initial);
    return initial;
}

function saveAvailability() {
    writeStorage(AVAILABILITY_KEY, availability);
}

function getAvailableTickets(eventId) {
    if (typeof availability[eventId] === "number") {
        return availability[eventId];
    }

    const event = eventList.find(function (item) {
        return item.id === eventId;
    });

    return event ? event.availableTickets : 0;
}

function setAvailableTickets(eventId, quantity) {
    availability[eventId] = Math.max(0, quantity);
    saveAvailability();
}

function nextBookingId() {
    let counter = readStorage(BOOKING_COUNTER_KEY, 0);
    counter += 1;
    writeStorage(BOOKING_COUNTER_KEY, counter);
    return "EG-" + String(counter).padStart(4, "0");
}

// ---------- Event rendering ----------

function renderEvents() {
    if (!eventsGrid) {
        return;
    }

    const search = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const location = locationInput ? locationInput.value.trim().toLowerCase() : "";
    const date = dateInput ? dateInput.value : "";
    const category = categorySelect ? categorySelect.value : "All";
    const activeCategory = category !== "All" ? category : selectedCategory;

    let filteredEvents = eventList.filter(function (event) {
        const searchableText = (
            event.name + " " +
            event.venue + " " +
            event.category + " " +
            event.description
        ).toLowerCase();

        const matchesSearch = !search || searchableText.includes(search);
        const matchesLocation = !location || event.venue.toLowerCase().includes(location);
        const matchesDate = !date || event.dateISO === date;
        const matchesCategory =
            activeCategory === "All" ||
            event.category === activeCategory;

        return matchesSearch && matchesLocation && matchesDate && matchesCategory;
    });

    filteredEvents.sort(function (a, b) {
        if (sortSelect && sortSelect.value === "price-low") {
            return a.price - b.price;
        }

        if (sortSelect && sortSelect.value === "price-high") {
            return b.price - a.price;
        }

        if (sortSelect && sortSelect.value === "name") {
            return a.name.localeCompare(b.name);
        }

        if (sortSelect && sortSelect.value === "date") {
            return a.dateISO.localeCompare(b.dateISO);
        }

        return a.dateISO.localeCompare(b.dateISO);
    });

    eventsGrid.innerHTML = "";

    if (filteredEvents.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "no-results";
        emptyMessage.textContent = "No events found. Try changing your search or filters.";
        eventsGrid.appendChild(emptyMessage);
    }

    filteredEvents.forEach(function (event) {
        eventsGrid.appendChild(createEventCard(event));
    });

    if (eventHeading) {
        eventHeading.textContent = activeCategory + " Events (" + filteredEvents.length + ")";
    }
}

function createEventCard(event) {
    const card = document.createElement("article");
    card.className = "event-card";
    card.dataset.eventId = event.id;

    const imageSection = document.createElement("section");
    imageSection.className = "event-image";

    const image = document.createElement("img");
    image.src = event.img;
    image.alt = event.name;

    const infoSection = document.createElement("section");
    infoSection.className = "event-info";

    const title = document.createElement("h3");
    title.textContent = event.name;

    const venue = document.createElement("p");
    venue.className = "event-detail";
    venue.textContent = event.description;

    const category = document.createElement("p");
    category.className = "event-detail";
    category.textContent = "Category: " + event.category;

    const eventDate = document.createElement("p");
    eventDate.className = "event-detail";
    eventDate.textContent = event.date;

    const ticketsLeft = document.createElement("p");
    ticketsLeft.className = "event-detail";
    ticketsLeft.textContent = getAvailableTickets(event.id) + " tickets available";

    const bottom = document.createElement("div");
    bottom.className = "event-bottom";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "₹" + event.price;

    const bookButton = document.createElement("button");
    bookButton.type = "button";
    bookButton.className = "book-btn";
    bookButton.textContent = getAvailableTickets(event.id) > 0 ? "Book Now" : "Sold Out";
    bookButton.disabled = getAvailableTickets(event.id) <= 0;
    bookButton.addEventListener("click", function (clickEvent) {
        clickEvent.stopPropagation();
        addToBooking(event);
    });

    bottom.appendChild(price);
    bottom.appendChild(bookButton);

    infoSection.appendChild(title);
    infoSection.appendChild(venue);
    infoSection.appendChild(category);
    infoSection.appendChild(eventDate);
    infoSection.appendChild(ticketsLeft);
    infoSection.appendChild(bottom);

    imageSection.appendChild(image);
    card.appendChild(imageSection);
    card.appendChild(infoSection);

    card.addEventListener("click", function (clickEvent) {
        if (clickEvent.target.closest(".book-btn")) {
            return;
        }
        openEventDialog(event);
    });

    return card;
}

// ---------- Event details and booking dialog ----------

function ensureBookingDialog() {
    let dialog = document.getElementById("dialogWithComponents");

    if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.id = "dialogWithComponents";
        dialog.className = "dialog dialog-instant";
        document.body.appendChild(dialog);
    }

    return dialog;
}

function openEventDialog(event) {
    currentEvent = event;
    isBookingSubmitting = false;

    const dialog = ensureBookingDialog();

    dialog.innerHTML = `
        <div class="dialog-header">
            <h2 id="modalTitle">${escapeHtml(event.name)}</h2>
            <button type="button" id="closeDialogBtn" class="btn-close" aria-label="Close"></button>
        </div>

        <div class="dialog-body">
            <img id="modalImage" src="${escapeHtml(event.img)}" alt="${escapeHtml(event.name)}">

            <p id="modalLocation">${escapeHtml(event.venue)} • ${escapeHtml(event.category)}</p>
            <p id="modalDate">${escapeHtml(event.date)}</p>
            <h3 id="modalPrice">₹${event.price} per ticket</h3>

            <p id="modalAvailability">${getAvailableTickets(event.id)} tickets available</p>

            <div class="d-flex align-items-center gap-2 mt-3">
                <button type="button" class="btn btn-outline-secondary" id="decreaseQtyBtn">-</button>
                <input
                    type="number"
                    id="bookingQuantity"
                    class="form-control"
                    min="1"
                    max="${getAvailableTickets(event.id)}"
                    value="1"
                    style="max-width: 90px; text-align: center;">
                <button type="button" class="btn btn-outline-secondary" id="increaseQtyBtn">+</button>
            </div>

            <p class="mt-3 mb-1"><strong>Total: <span id="bookingTotal">₹${event.price}</span></strong></p>
            <p id="bookingError" class="text-danger small mb-0"></p>
        </div>

        <div class="dialog-footer">
            <button type="button" id="closeDialogFooter" class="btn-solid theme-secondary">Close</button>
            <button type="button" id="modalBookBtn" class="btn-solid theme-primary">Confirm Booking</button>
        </div>
    `;

    dialog.querySelector("#closeDialogBtn").onclick = function () {
        dialog.close();
    };

    dialog.querySelector("#closeDialogFooter").onclick = function () {
        dialog.close();
    };

    dialog.querySelector("#decreaseQtyBtn").onclick = function () {
        changeBookingQuantity(-1);
    };

    dialog.querySelector("#increaseQtyBtn").onclick = function () {
        changeBookingQuantity(1);
    };

    dialog.querySelector("#bookingQuantity").addEventListener("input", updateBookingTotal);

    dialog.querySelector("#modalBookBtn").onclick = confirmBooking;

    if (!dialog.open) {
        dialog.showModal();
    }
}

function changeBookingQuantity(change) {
    const input = document.getElementById("bookingQuantity");

    if (!input || !currentEvent) {
        return;
    }

    let quantity = parseInt(input.value, 10);

    if (isNaN(quantity)) {
        quantity = 1;
    }

    quantity += change;
    quantity = Math.min(Math.max(quantity, 1), getAvailableTickets(currentEvent.id));
    input.value = quantity;
    updateBookingTotal();
}

function updateBookingTotal() {
    const input = document.getElementById("bookingQuantity");
    const total = document.getElementById("bookingTotal");

    if (!input || !total || !currentEvent) {
        return;
    }

    let quantity = parseInt(input.value, 10);

    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        input.value = quantity;
    }

    total.textContent = "₹" + (currentEvent.price * quantity);
}

function confirmBooking() {
    if (!currentEvent || isBookingSubmitting) {
        return;
    }

    const quantityInput = document.getElementById("bookingQuantity");
    const errorBox = document.getElementById("bookingError");
    const confirmButton = document.getElementById("modalBookBtn");

    if (!quantityInput || !errorBox || !confirmButton) {
        return;
    }

    const quantity = parseInt(quantityInput.value, 10);
    const available = getAvailableTickets(currentEvent.id);

    errorBox.textContent = "";

    if (isNaN(quantity) || quantity < 1) {
        errorBox.textContent = "Please enter a valid ticket quantity.";
        return;
    }

    if (quantity > available) {
        errorBox.textContent = "Only " + available + " tickets are available for this event.";
        return;
    }

    isBookingSubmitting = true;
    confirmButton.disabled = true;
    confirmButton.textContent = "Booking...";

    const booking = {
        bookingId: nextBookingId(),
        eventId: currentEvent.id,
        eventName: currentEvent.name,
        category: currentEvent.category,
        venue: currentEvent.venue,
        date: currentEvent.date,
        dateISO: currentEvent.dateISO,
        quantity: quantity,
        pricePerTicket: currentEvent.price,
        totalAmount: currentEvent.price * quantity,
        status: "Confirmed",
        createdAt: new Date().toISOString()
    };

    bookings.unshift(booking);
    saveBookings();
    setAvailableTickets(currentEvent.id, available - quantity);

    renderEvents();
    showBookingSuccess(booking);
}

function showBookingSuccess(booking) {
    const dialog = document.getElementById("dialogWithComponents");

    if (!dialog) {
        return;
    }

    dialog.innerHTML = `
        <div class="dialog-header">
            <h2 id="modalTitle">Booking Confirmed</h2>
            <button type="button" id="closeDialogBtn" class="btn-close" aria-label="Close"></button>
        </div>

        <div class="dialog-body text-center">
            <div style="font-size: 42px; color: #217344; margin-bottom: 12px;">✓</div>
            <h3 class="mb-2">${escapeHtml(booking.eventName)}</h3>
            <p class="mb-1">Booking ID: <strong>${escapeHtml(booking.bookingId)}</strong></p>
            <p class="mb-1">Quantity: ${booking.quantity}</p>
            <p class="mb-1">Total Amount: <strong>₹${booking.totalAmount}</strong></p>
            <p class="mb-0">Status: <strong>Confirmed</strong></p>
        </div>

        <div class="dialog-footer">
            <button type="button" id="closeDialogFooter" class="btn-solid theme-secondary">Done</button>
            <button type="button" id="viewBookingsBtn" class="btn-solid theme-primary">View My Bookings</button>
        </div>
    `;

    dialog.querySelector("#closeDialogBtn").onclick = function () {
        dialog.close();
    };

    dialog.querySelector("#closeDialogFooter").onclick = function () {
        dialog.close();
    };

    dialog.querySelector("#viewBookingsBtn").onclick = function () {
        dialog.close();
        showBooking();
        openBookingsModal();
    };

    updateBookingCount();
}

// Compatibility name used by existing card markup.
function addToBooking(event) {
    openEventDialog(event);
}

// ---------- My Bookings modal ----------

function openBookingsModal() {
    const modalElement = document.getElementById("exampleModal");

    if (modalElement && window.bootstrap && window.bootstrap.Modal) {
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
        return;
    }

    if (modalElement) {
        modalElement.style.display = "block";
        modalElement.classList.add("show");
    }
}

function showBooking() {
    if (!ticketContainer) {
        return;
    }

    if (bookings.length === 0) {
        ticketContainer.innerHTML = `
            <div class="text-center py-5">
                <h5 class="mb-2">No bookings yet</h5>
                <p class="text-muted mb-0">Book an event to see your tickets here.</p>
            </div>
        `;
        updateBookingCount();
        return;
    }

    let tableCode = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped align-middle">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
    `;

    bookings.forEach(function (booking) {
        const canCancel = booking.status === "Confirmed";
        const cancelButton = canCancel
            ? `<button type="button" class="btn btn-outline-danger btn-sm" data-cancel-booking="${escapeHtml(booking.bookingId)}">Cancel</button>`
            : `<span class="badge bg-secondary">Cancelled</span>`;

        tableCode += `
            <tr>
                <td>${escapeHtml(booking.bookingId)}</td>
                <td>${escapeHtml(booking.eventName)}</td>
                <td>${escapeHtml(booking.date)}</td>
                <td>${escapeHtml(booking.venue)}</td>
                <td>${booking.quantity}</td>
                <td>₹${booking.totalAmount}</td>
                <td><span class="badge ${booking.status === "Confirmed" ? "bg-success" : "bg-danger"}">${escapeHtml(booking.status)}</span></td>
                <td>${cancelButton}</td>
            </tr>
        `;
    });

    tableCode += `
                </tbody>
            </table>
        </div>
    `;

    ticketContainer.innerHTML = tableCode;
    updateBookingCount();
}

function cancelBooking(bookingId) {
    const booking = bookings.find(function (item) {
        return item.bookingId === bookingId;
    });

    if (!booking || booking.status !== "Confirmed") {
        return;
    }

    const event = eventList.find(function (item) {
        return item.id === booking.eventId;
    });

    booking.status = "Cancelled";
    booking.cancelledAt = new Date().toISOString();

    if (event) {
        setAvailableTickets(event.id, getAvailableTickets(event.id) + booking.quantity);
    }

    saveBookings();
    renderEvents();
    showBooking();
}

function updateBookingCount() {
    if (!qtyBadge) {
        return;
    }

    const totalTickets = bookings.reduce(function (sum, booking) {
        return booking.status === "Confirmed" ? sum + booking.quantity : sum;
    }, 0);

    qtyBadge.textContent = totalTickets;
}

// ---------- Filters ----------

function applyFilters() {
    renderEvents();
}

function applyUrlFilters() {
    const params = new URLSearchParams(window.location.search);
    const categoryAliases = {
        music: "Music",
        sports: "Sports",
        theatre: "Theatre",
        comedy: "Comedy",
        workshops: "Workshops",
        exhibitions: "Exhibitions",
        food: "Food",
        conferences: "Conferences",
        celebrations: "Celebrations"
    };

    if (searchInput && params.get("search")) {
        searchInput.value = params.get("search");
    }

    if (locationInput && params.get("location")) {
        locationInput.value = params.get("location");
    }

    if (dateInput && params.get("date")) {
        dateInput.value = params.get("date");
    }

    if (params.get("category")) {
        const rawCategory = params.get("category").toLowerCase();
        const mappedCategory = categoryAliases[rawCategory] || params.get("category");

        selectedCategory = mappedCategory;

        if (categorySelect) {
            const hasOption = Array.from(categorySelect.options).some(function (option) {
                return option.value === mappedCategory;
            });
            categorySelect.value = hasOption ? mappedCategory : "All";
        }

        document.querySelectorAll(".category-btn").forEach(function (button) {
            button.classList.toggle("active", button.dataset.category === mappedCategory);
        });

        if (mappedCategory === "All") {
            selectedCategory = "All";
        }
    }
}

function clearAllFilters() {
    if (searchInput) searchInput.value = "";
    if (locationInput) locationInput.value = "";
    if (dateInput) dateInput.value = "";
    if (categorySelect) categorySelect.value = "All";

    selectedCategory = "All";

    document.querySelectorAll(".category-btn").forEach(function (button) {
        button.classList.toggle("active", button.dataset.category === "All");
    });

    applyFilters();
}

// ---------- Newsletter ----------

function setupNewsletter() {
    const newsletterForm = document.getElementById("newsletterForm");

    if (!newsletterForm) {
        return;
    }

    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("emailInput");

        if (!emailInput) {
            return;
        }

        const email = emailInput.value.trim();

        if (!isValidEmail(email)) {
            showNewsletterMessage(newsletterForm, "Please enter a valid email address.", "error");
            return;
        }

        showNewsletterMessage(newsletterForm, "Thank you for subscribing!", "success");
        newsletterForm.reset();
    });
}

function showNewsletterMessage(form, message, type) {
    let messageBox = form.parentElement.querySelector(".newsletter-message");

    if (!messageBox) {
        messageBox = document.createElement("p");
        messageBox.className = "newsletter-message small mt-2 mb-0";
        form.insertAdjacentElement("afterend", messageBox);
    }

    messageBox.textContent = message;
    messageBox.className = "newsletter-message small mt-2 mb-0 " + (type === "error" ? "text-danger" : "text-success");
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ---------- Initialize ----------

function init() {
    // Store the event catalog so event information is available in LocalStorage.
    writeStorage(EVENTS_KEY, eventList);

    applyUrlFilters();
    renderEvents();
    showBooking();
    updateBookingCount();

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (locationInput) locationInput.addEventListener("input", applyFilters);
    if (dateInput) dateInput.addEventListener("change", applyFilters);
    if (categorySelect) {
        categorySelect.addEventListener("change", function () {
            selectedCategory = "All";

            document.querySelectorAll(".category-btn").forEach(function (button) {
                button.classList.toggle("active", button.dataset.category === "All");
            });

            applyFilters();
        });
    }
    if (sortSelect) sortSelect.addEventListener("change", applyFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener("click", clearAllFilters);

    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            applyFilters();
        });
    }

    document.querySelectorAll(".category-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            selectedCategory = button.dataset.category;

            document.querySelectorAll(".category-btn").forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            if (categorySelect) {
                categorySelect.value = "All";
            }

            applyFilters();
        });
    });

    if (ticketContainer) {
        ticketContainer.addEventListener("click", function (event) {
            const cancelButton = event.target.closest("[data-cancel-booking]");

            if (cancelButton) {
                cancelBooking(cancelButton.dataset.cancelBooking);
            }
        });
    }

    const bookLink = document.getElementById("bookModal");
    if (bookLink) {
        bookLink.addEventListener("click", function () {
            showBooking();
            openBookingsModal();
        });
    }

    document.querySelectorAll('footer a[href="Events.html#bookings"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            showBooking();
            openBookingsModal();
        });
    });

    setupNewsletter();

    // Open My Bookings when the page is opened with Events.html#bookings.
    if (window.location.hash === "#bookings") {
        showBooking();
        openBookingsModal();
    }
}

document.addEventListener("DOMContentLoaded", init);
