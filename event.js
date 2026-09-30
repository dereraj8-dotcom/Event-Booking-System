 const eventList = [
                {
                        id :101,
                        img :"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80",
                        name :"Sunburn Arena",
                        description : "📍 Goa, India",
                        date :  "▦ 12 OCT 2026" ,
                        price : "₹1099"
                },
                 {
                        id :102,
                        img :"https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=600&q=80",
                        name :"Lagaan The Musical",
                        description : "📍 Mumbai, India",
                        date :  "▦ 18 OCT 2026" ,
                        price : "₹1299"
                },
                 {
                        id :103,
                        img :"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
                        name :"Delhi Food Festival",
                        description : "📍 Delhi, India",
                        date : "▦ 20 OCT 2026"  ,
                        price : "₹499"
                },
                 {
                        id :104,
                        img :"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
                        name :"Tech Conference",
                        description : "📍 Bengaluru, India",
                        date :  "▦ 25 OCT 2026" ,
                        price : "₹1499"
                },
                 {
                        id :105,
                        img :"https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=600&q=80",
                        name :"Comedy Night Live",
                        description : "📍 Mumbai, India",
                        date :  "▦ 02 NOV 2026" ,
                        price : "₹799"
                },
                 {
                        id :106,
                        img :"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
                        name :"Art & Painting Workshop",
                        description : "📍 Pune, India",
                        date :  "▦ 03 NOV 2026" ,
                        price : "₹599"
                },
                 {
                        id :107,
                        img :"https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80",
                        name :"Football Match",
                        description : "📍 Kolkata, India",
                        date : "▦ 08 NOV 2026"  ,
                        price : "₹899"
                },
                 {
                        id :108,
                        img :"https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80",
                        name :"Modern Art Exhibition",
                        description : "📍 Delhi, India",
                        date :  "▦ 15 NOV 2026" ,
                        price : "₹699"
                }
        ];


         eventList.forEach(function(event){
                const card = document.createElement("div");
        card.classList.add("event-card");

        const section1 = document.createElement("section");
        section1.classList.add("event-image");

         const eventimage = document.createElement("img");
         eventimage.src = event.img;


         const section2 = document.createElement("section");
        section2.classList.add("event-info");

        const title = document.createElement("h3");
        title.textContent.add = event.name;

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

