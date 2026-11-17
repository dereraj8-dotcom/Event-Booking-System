
// EventGo Events Page

const eventList = [
    {
        id: 101,
        img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80",
        name: "Sunburn Arena",
        description: "Goa, India",
        date: "12 OCT 2026",
        price: 1099,
        category: "Music",
        availableTickets: 100
    },
    {
        id: 102,
        img: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=600&q=80",
        name: "Lagaan The Musical",
        description: "Mumbai, India",
        date: "18 OCT 2026",
        price: 1299,
        category: "Theatre",
        availableTickets: 100
    },
    {
        id: 103,
        img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
        name: "Delhi Food Festival",
        description: "Delhi, India",
        date: "20 OCT 2026",
        price: 499,
        category: "Food",
        availableTickets: 100
    },
    {
        id: 104,
        img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
        name: "Tech Conference",
        description: "Bengaluru, India",
        date: "25 OCT 2026",
        price: 1499,
        category: "Conferences",
        availableTickets: 100
    },
    {
        id: 105,
        img: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=600&q=80",
        name: "Comedy Night Live",
        description: "Mumbai, India",
        date: "02 NOV 2026",
        price: 799,
        category: "Comedy",
        availableTickets: 100
    },
    {
        id: 106,
        img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
        name: "Art & Painting Workshop",
        description: "Pune, India",
        date: "03 NOV 2026",
        price: 599,
        category: "Workshops",
        availableTickets: 100
    },
    {
        id: 107,
        img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80",
        name: "Football Match",
        description: "Kolkata, India",
        date: "08 NOV 2026",
        price: 899,
        category: "Sports",
        availableTickets: 100
    },
    {
        id: 108,
        img: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80",
        name: "Modern Art Exhibition",
        description: "Delhi, India",
        date: "15 NOV 2026",
        price: 699,
        category: "Exhibitions",
        availableTickets: 100
    }
];


// LocalStorage

let bookings = JSON.parse(localStorage.getItem("eventGoBookings")) || [];

let availability = JSON.parse(localStorage.getItem("eventGoAvailability")) || {};

eventList.forEach(function(event) {

    if (availability[event.id] === undefined) {
        availability[event.id] = event.availableTickets;
    }

});

function saveData() {

    localStorage.setItem("eventGoBookings", JSON.stringify(bookings));

    localStorage.setItem("eventGoAvailability", JSON.stringify(availability));

}


// Display Events

function showEvents(events) {

    const eventContainer = document.getElementById("eventsGrid");

    if (!eventContainer) return;

    eventContainer.innerHTML = "";

    if (events.length === 0) {
        eventContainer.innerHTML =
            "<h4 class='text-center'>No events found!</h4>";
        return;
    }

    events.forEach(function(event) {

        const card = document.createElement("div");
        card.classList.add("event-card");

        const section1 = document.createElement("section");
        section1.classList.add("event-image");

        const image = document.createElement("img");
        image.src = event.img;
        image.alt = event.name;

        section1.appendChild(image);

        const section2 = document.createElement("section");
        section2.classList.add("event-info");

        const name = document.createElement("h3");
        name.textContent = event.name;

        const location = document.createElement("p");
        location.textContent = "📍 " + event.description;

        const date = document.createElement("p");
        date.textContent = "📅 " + event.date;

        const category = document.createElement("p");
        category.textContent = "Category: " + event.category;

        const tickets = document.createElement("p");
        tickets.textContent = availability[event.id] + " tickets available";

        const price = document.createElement("p");
        price.textContent = "₹" + event.price;

        const bookButton = document.createElement("button");

        bookButton.textContent =
            availability[event.id] > 0 ? "Book Now" : "Sold Out";

        bookButton.disabled = availability[event.id] <= 0;

        bookButton.addEventListener("click", function() {
            addToBooking(event);
        });

        section2.appendChild(name);
        section2.appendChild(location);
        section2.appendChild(date);
        section2.appendChild(category);
        section2.appendChild(tickets);
        section2.appendChild(price);
        section2.appendChild(bookButton);

        card.appendChild(section1);
        card.appendChild(section2);

        eventContainer.appendChild(card);

    });

}


// Add Booking

function addToBooking(event) {

    const existingEvent = bookings.find(function(item) {
        return item.id === event.id && item.status === "Confirmed";
    });

    if (availability[event.id] <= 0) {
        alert("Tickets are sold out!");
        return;
    }

    if (existingEvent) {

        existingEvent.quantity++;

    } else {

        const booking = {
            id: event.id,
            bookingId: "EG-" + Date.now(),
            name: event.name,
            date: event.date,
            venue: event.description,
            price: event.price,
            quantity: 1,
            status: "Confirmed"
        };

        bookings.push(booking);

    }

    availability[event.id]--;

    saveData();

    updateBookingCount();

    showEvents(eventList);

    alert("Event booked successfully!");

}


// Show Bookings

function showBooking() {

    let subTotal = 0;

    const billTable = document.getElementById("ticket");

    if (!billTable) return;

    if (bookings.length === 0) {

        billTable.innerHTML =
            "<h5 class='text-center'>No bookings found!</h5>";

        updateBookingCount();

        return;
    }

    let tableCode = `
        <div class="table-responsive">
        <table class="table table-bordered table-striped">
        <tr>
            <th>Booking ID</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    `;

    bookings.forEach(function(item) {

        let total = item.price * item.quantity;

        subTotal += total;

        tableCode += `
            <tr>
                <td>${item.bookingId}</td>
                <td>${item.name}</td>
                <td>${item.date}</td>
                <td>₹${item.price}</td>

                <td>
                    ${item.status === "Confirmed" ? `
                    <button class="btn btn-danger btn-sm"
                    onclick="decreaseQty(${item.id})">-</button>
                    ` : ""}

                    ${item.quantity}

                    ${item.status === "Confirmed" ? `
                    <button class="btn btn-success btn-sm"
                    onclick="increaseQty(${item.id})">+</button>
                    ` : ""}
                </td>

                <td>₹${total}</td>

                <td>${item.status}</td>

                <td>
                    ${item.status === "Confirmed" ? `
                    <button class="btn btn-outline-danger btn-sm"
                    onclick="removeItem('${item.bookingId}')">
                    Cancel
                    </button>
                    ` : "Cancelled"}
                </td>
            </tr>
        `;

    });

    tableCode += `
        <tr>
            <td colspan="5" class="text-end">
                <strong>Total Billing</strong>
            </td>
            <td colspan="3"><strong>₹${subTotal}</strong></td>
        </tr>
        </table>
        </div>

        <button class="btn btn-success w-100 mt-3"
        onclick="payNow()">
            Proceed to Pay ₹${subTotal}
        </button>
    `;

    billTable.innerHTML = tableCode;

    updateBookingCount();

}


// Open Payment Modal

function payNow() {

    const pendingBookings = bookings.filter(function(item) {
        return item.status === "Confirmed" && !item.paymentStatus;
    });

    if (pendingBookings.length === 0) {
        alert("No unpaid bookings available!");
        return;
    }

    let modal = new bootstrap.Modal(
        document.getElementById("paymentModal")
    );

    modal.show();

}


// Payment Fields

document.getElementById("paymentMethod").addEventListener("change", function() {

    let method = this.value;

    let fields = document.getElementById("paymentFields");

    if (method === "UPI") {

        fields.innerHTML = `
            <label class="form-label">UPI ID</label>
            <input type="text" id="paymentDetails"
            class="form-control" placeholder="example@upi" required>
        `;

    }

    else if (method === "Credit/Debit Card") {

        fields.innerHTML = `
            <label class="form-label">Card Number</label>
            <input type="text" id="paymentDetails"
            class="form-control" placeholder="Demo card number"
            maxlength="19" required>
        `;

    }

    else if (method === "Net Banking") {

        fields.innerHTML = `
            <label class="form-label">Bank Name</label>
            <input type="text" id="paymentDetails"
            class="form-control" placeholder="Enter bank name" required>
        `;

    }

    else {
        fields.innerHTML = "";
    }

});


// Confirm Payment and Generate Receipt

function confirmPayment() {

    let name = document.getElementById("customerName").value.trim();

    let email = document.getElementById("customerEmail").value.trim();

    let phone = document.getElementById("customerPhone").value.trim();

    let method = document.getElementById("paymentMethod").value;

    let details = document.getElementById("paymentDetails");

    if (!name || !email || !/^[0-9]{10}$/.test(phone) || !method) {

        alert("Please enter valid customer details!");

        return;
    }

    if (method !== "Cash at Venue" &&
        (!details || !details.value.trim())) {

        alert("Please enter payment details!");

        return;
    }

    if (confirm("Do you want to confirm your payment?")) {

        let pendingBookings = bookings.filter(function(item) {
            return item.status === "Confirmed" && !item.paymentStatus;
        });

        if (pendingBookings.length === 0) {
            alert("No unpaid bookings available!");
            return;
        }

        let receiptNumber = "EGR-" + Date.now();

        pendingBookings.forEach(function(item) {

            item.customerName = name;

            item.customerEmail = email;

            item.customerPhone = phone;

            item.paymentMethod = method;

            item.paymentStatus =
                method === "Cash at Venue" ? "Pending" : "Paid";

            item.bookingDate = new Date().toLocaleString();

            item.receiptNumber = receiptNumber;

        });

        saveData();

        alert("Booking completed successfully!");

        window.location.href = "Receipt.html";

    }

}


// Increase Quantity

function increaseQty(eventID) {

    const existingEvent = bookings.find(function(item) {
        return item.id === eventID &&
               item.status === "Confirmed" &&
               !item.paymentStatus;
    });

    if (!existingEvent || availability[eventID] <= 0) {

        alert("No more tickets available!");

        return;
    }

    existingEvent.quantity++;

    availability[eventID]--;

    saveData();

    showBooking();

    showEvents(eventList);

}


// Decrease Quantity

function decreaseQty(eventID) {

    const existingEvent = bookings.find(function(item) {
        return item.id === eventID &&
               item.status === "Confirmed" &&
               !item.paymentStatus;
    });

    if (!existingEvent) return;

    if (existingEvent.quantity > 1) {

        existingEvent.quantity--;

        availability[eventID]++;

    } else {

        bookings = bookings.filter(function(item) {
            return item.id !== eventID;
        });

        availability[eventID]++;

    }

    saveData();

    showBooking();

    showEvents(eventList);

    updateBookingCount();

}


// Cancel Booking

function removeItem(bookingID) {

    if (confirm("Are you sure you want to cancel this booking?")) {

        const existingBooking = bookings.find(function(item) {
            return item.bookingId === bookingID;
        });

        if (!existingBooking) return;

        if (existingBooking.paymentStatus === "Paid") {
            alert("This booking is already paid and cannot be cancelled here.");
            return;
        }

        availability[existingBooking.id] += existingBooking.quantity;

        bookings = bookings.filter(function(item) {
            return item.bookingId !== bookingID;
        });

        saveData();

        showBooking();

        showEvents(eventList);

        updateBookingCount();

        alert("Booking cancelled successfully!");

    }

}


// Search Events

function searchEvent() {

    const searchText = document.getElementById("searchInput").value;

    const filteredEvents = eventList.filter(function(event) {

        return (
            event.name.toLowerCase().includes(searchText.toLowerCase()) ||
            event.description.toLowerCase().includes(searchText.toLowerCase()) ||
            event.category.toLowerCase().includes(searchText.toLowerCase())
        );

    });

    showEvents(filteredEvents);

}


// Booking Count

function updateBookingCount() {

    const totalTickets = bookings.reduce(function(sum, item) {

        return item.status === "Confirmed"
            ? sum + item.quantity
            : sum;

    }, 0);

    const qty = document.getElementById("qty");

    if (qty) {
        qty.textContent = totalTickets;
    }

}


// Initialize

document.addEventListener("DOMContentLoaded", function() {

    const search = document.getElementById("searchInput");

    if (search) {
        search.addEventListener("input", searchEvent);
    }

    const cartLink = document.getElementById("bookModal");

    if (cartLink) {

        cartLink.addEventListener("click", function(event) {

            event.preventDefault();

            showBooking();

        });

    }

    showEvents(eventList);

    showBooking();

    updateBookingCount();

});
