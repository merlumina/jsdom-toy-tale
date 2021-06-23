const toyCollection = document.getElementById('toy-collection');

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => resp.json())
});

function createToyInfoCard(toyArray) {
  for (const toy of toyArray) {
    const toyCard = document.createElement('div').setAttribute('class', 'card');
    const cardName = document.createElement('h2');
    const cardImg = document.createElement('img').setAttribute('class', 'toy-avatar');
    const cardLikes = document.createElement('p');
    const cardLikeBtn = document.createElement('button').setAttribute('class', 'like-btn');
    const cardElements = [cardName, cardImg, cardLikes, cardLikeBtn];

    cardName.innerText = toy.name;
    cardImg.src = toy.image;
    cardLikes.innerText = `${toy.likes} likes`;
    cardLikeBtn.innerText = "Like <3";

    for (const element of cardElements) {
      toyCard.appendChild(element);
    }

    toyCollection.appendChild(toyCard);
  }
}