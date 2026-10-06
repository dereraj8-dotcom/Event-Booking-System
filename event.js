// const eventsGrid = document.getElementById("eventsGrid");
// const cards = Array.from(
//     eventsGrid.querySelectorAll(".event-card")
// );

// const searchInput = document.getElementById("searchInput");
// const locationInput = document.getElementById("locationInput");
// const dateInput = document.getElementById("dateInput");
// const categorySelect = document.getElementById("categorySelect");
// const sortSelect = document.getElementById("sortSelect");
// const eventHeading = document.getElementById("eventHeading");

// let selectedCategory = "All";

// function filterEvents() {
//     const search = searchInput.value.trim().toLowerCase();
//     const location = locationInput.value.trim().toLowerCase();
//     const date = dateInput.value;
//     const category = categorySelect.value;

//     const matchingCards = cards.filter(card => {
//         const name = card.querySelector("h3").textContent.toLowerCase();
//         const eventLocation = card.dataset.location.toLowerCase();
//         const eventDate = card.dataset.date;
//         const eventCategory = card.dataset.category;

//         const matchesSearch =
//             name.includes(search) ||
//             eventCategory.toLowerCase().includes(search);

//         const matchesLocation =
//             eventLocation.includes(location);

//         const matchesDate =
//             !date || eventDate === date;

//         const matchesCategory =
//             category === "All" ||
//             eventCategory === category;

//         const matchesCategoryButton =
//             selectedCategory === "All" ||
//             eventCategory === selectedCategory;

//         return matchesSearch &&
//             matchesLocation &&
//             matchesDate &&
//             matchesCategory &&
//             matchesCategoryButton;
//     });

//     matchingCards.sort((a, b) => {
//         if (sortSelect.value === "price-low") {
//             return Number(a.dataset.price) -
//                 Number(b.dataset.price);
//         }

//         if (sortSelect.value === "price-high") {
//             return Number(b.dataset.price) -
//                 Number(a.dataset.price);
//         }

//         if (sortSelect.value === "name") {
//             return a.querySelector("h3").textContent.localeCompare(
//                 b.querySelector("h3").textContent
//             );
//         }

//         return 0;
//     });

//     cards.forEach(card => {
//         card.style.display = "none";
//     });

//     matchingCards.forEach(card => {
//         card.style.display = "";
//         eventsGrid.appendChild(card);
//     });

//     let message = eventsGrid.querySelector(".no-results");

//     if (message) {
//         message.remove();
//     }

//     if (matchingCards.length === 0) {
//         message = document.createElement("p");
//         message.className = "no-results";
//         message.textContent =
//             "No events found. Try changing your search or filters.";
//         eventsGrid.appendChild(message);
//     }

//     eventHeading.textContent =
//         `${category === "All" ? selectedCategory : category} Events (${matchingCards.length})`;
// }

// document.getElementById("searchForm").addEventListener(
//     "submit",
//     function (event) {
//         event.preventDefault();
//         filterEvents();
//     }
// );

// sortSelect.addEventListener("change", filterEvents);

// document.querySelectorAll(".category-btn").forEach(button => {
//     button.addEventListener("click", function () {
//         selectedCategory = this.dataset.category;

//         document.querySelectorAll(".category-btn").forEach(btn => {
//             btn.classList.remove("active");
//         });

//         this.classList.add("active");

//         categorySelect.value = "All";
//         filterEvents();
//     });
// });

// // Booking demo
// document.querySelectorAll(".book-btn").forEach(button => {
//     button.addEventListener("click", function () {
//         const eventName = this.dataset.event;

//         const confirmed = confirm(
//             `Would you like to book "${eventName}"?`
//         );

//         if (confirmed) {
//             alert(
//                 `You selected ${eventName}. Connect a booking page or backend to complete your reservation.`
//             );
//         }
//     });
// });

// // Newsletter demo
// document.getElementById("newsletterForm").addEventListener(
//     "submit",
//     function (event) {
//         event.preventDefault();

//         const email = document.getElementById("emailInput").value;

//         alert(
//             `Thank you! Newsletter signup demo completed for ${email}.`
//         );

//         this.reset();
//     }
// );

// filterEvents(); 

const eventList = [
        {
                id: 101,
                img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80",
                name: "Sunburn Arena",
                description: "📍 Goa, India",
                date: "▦ 12 OCT 2026",
                price: "1099"
        },
        {
                id: 102,
                img: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=600&q=80",
                name: "Lagaan The Musical",
                description: "📍 Mumbai, India",
                date: "▦ 18 OCT 2026",
                price: "1299"
        },
        {
                id: 103,
                img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
                name: "Delhi Food Festival",
                description: "📍 Delhi, India",
                date: "▦ 20 OCT 2026",
                price: "499"
        },
        {
                id: 104,
                img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
                name: "Tech Conference",
                description: "📍 Bengaluru, India",
                date: "▦ 25 OCT 2026",
                price: "1499"
        },
        {
                id: 105,
                img: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=600&q=80",
                name: "Comedy Night Live",
                description: "📍 Mumbai, India",
                date: "▦ 02 NOV 2026",
                price: "799"
        },
        {
                id: 106,
                img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
                name: "Art & Painting Workshop",
                description: "📍 Pune, India",
                date: "▦ 03 NOV 2026",
                price: "599"
        },
        {
                id: 107,
                img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80",
                name: "Football Match",
                description: "📍 Kolkata, India",
                date: "▦ 08 NOV 2026",
                price: "899"
        },
        {
                id: 108,
                img: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80",
                name: "Modern Art Exhibition",
                description: "📍 Delhi, India",
                date: "▦ 15 NOV 2026",
                price: "699"
        }
];


const entry = [];


eventList.forEach(function (event) {
        const card = document.createElement("div");
        card.classList.add("event-card");

        const section1 = document.createElement("section");
        section1.classList.add("event-image");

        const eventimage = document.createElement("img");
        eventimage.src = event.img;


        const section2 = document.createElement("section");
        section2.classList.add("event-info");

        const title = document.createElement("h3");
        title.textContent = event.name;

        const eventdetail = document.createElement("p");
        eventdetail.textContent = event.description;
        eventdetail.classList.add("event-detail");

        const eventdetail1 = document.createElement("p");
        eventdetail1.textContent = event.date;
        eventdetail1.classList.add("event-detail");

        const eventbottom = document.createElement("div");
        eventbottom.classList.add("event-bottom");

        const eventprice = document.createElement("span");
        eventprice.textContent = event.price;
        eventprice.classList.add("price");

        const book = document.createElement("button");
        book.textContent = "Book";
        book.classList.add("book-btn");
        book.addEventListener("click", addToBooking);
        function addToBooking() {
                const existingBooking = entry.find(function (perf) {
                        return perf.id === event.id;

                });
                if (existingBooking) {
                        existingBooking.quantity++;
                }
                else {
                        const pass = {
                                id: event.id,
                                name: event.name,
                                description: event.description,
                                date: event.date,
                                price: event.price,
                                quantity: 1

                        };
                        entry.push(pass);
                        document.getElementById("qty").firstChild.textContent = entry.length;

                }
                console.log(entry);

        }


        section2.appendChild(title);
        section2.appendChild(eventdetail);
        section2.appendChild(eventdetail1);
        section2.appendChild(eventbottom);
        section2.appendChild(eventprice);
        section2.appendChild(book);
        section1.appendChild(eventimage);


        card.appendChild(section1);
        card.appendChild(section2);

        const Event = document.getElementById("eventsGrid");
        Event.appendChild(card);
});


const bookLink = document.getElementById("bookModal");
bookLink.addEventListener("click", showBooking);

function showBooking() {
        subtotal = 0;
        const bookTable = document.getElementById("ticket");
        let tableCode = "";
        tableCode += `<table class="table table-bordered table-striped">
                <tr>
                <th>Ticket ID</th>
                <th>Event Name</th>
                <th>Decription</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Price</th>
                </tr>`;

        entry.forEach(function (pass) {
                let total = pass.price * pass.quantity;
                subtotal = subtotal + total;

                let x =`<tr>
                        <td>${pass.id}</td>
                        <td>${pass.name}</td>
                        <td>${pass.description}</td>
                        <td>${pass.date}</td>
                        <td>
                <button class="btn btn-danger btn-sm" onclick="decreaseQty(${pass.id})">-</button>
                <span>${pass.quantity}</span>
                <button class="btn btn-success btn-sm" onclick="increaseQty(${pass.id})">+</button>
            </td>
                        <td>₹${pass.price}</td>
                        </tr>`

                tableCode += x;

        });
        tableCode += `<tr class = "text-end">
                <td colspan = 5>Total Billing</td>
                <td>₹${subtotal}</td>
                </tr>`;
        tableCode += `</table>`;
        bookTable.innerHTML = tableCode;

}
function increaseQty(eventID) {

    const existingBooking = entry.find(function (perf) {
                        return perf.id === eventID;

                });

    existingBooking.quantity++;

    showBooking();
};

function decreaseQty(eventID) {

   const existingBooking = entry.find(function (perf) {
                        return perf.id === eventID;

                });

    existingBooking.quantity--;

    showBooking();
};
