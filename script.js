const places = [
    { name: "Peppa Pig World(Theme Park)", imgSrc: "https://cdn.shopify.com/s/files/1/0899/1470/files/IMG_1465sm.jpg?v=1678441228", imgAlt: "Image of Place 1", a: "https://peppapigworld.co.uk/" },
    { name: "Place 2", imgSrc: "img2.jpg", imgAlt: "Image of Place 2" },
    { name: "Place 3", imgSrc: "img3.jpg", imgAlt: "Image of Place 3" },
    { name: "Place 4", imgSrc: "img4.jpg", imgAlt: "Image of Place 4" },
    { name: "Place 5", imgSrc: "img5.jpg", imgAlt: "Image of Place 5" },
    { name: "Place 6", imgSrc: "img6.jpg", imgAlt: "Image of Place 6" },
    { name: "Place 7", imgSrc: "img7.jpg", imgAlt: "Image of Place 7" },
    { name: "Place 8", imgSrc: "img8.jpg", imgAlt: "Image of Place 8" },
    { name: "Place 9", imgSrc: "img9.jpg", imgAlt: "Image of Place 9" },
    { name: "Place 10", imgSrc: "img10.jpg", imgAlt: "Image of Place 10" }
];


const container = document.querySelector('.container');
const cardsContainer = document.createElement('div');
cardsContainer.className = 'cards';


function createCard(place) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const title = document.createElement('b');
    title.textContent = place.name;
    
    const img = document.createElement('img');
    img.src = place.imgSrc;
    img.alt = place.imgAlt;

    const a = document.createElement('a');
    a.href = place.a
    a.textContent = "Link to this place(click on this text)"
    
    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(a);
    return card;
}


places.forEach(place => {
    const newCard = createCard(place);
    cardsContainer.appendChild(newCard);
});

container.appendChild(cardsContainer);