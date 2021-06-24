let toyCollection = document.getElementById('toy-collection');
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;

function getToys() {
    return fetch('http://localhost:3000/toys')
    .then(resp => resp.json());
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((obj_toy) => {
    createToyInfoCard(obj_toy)
  })
}

function likes(e) {
  e.preventDefault();
  let moreLikes = parseInt(e.target.previousElementSibling.innerText) + 1;
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": moreLikes
    })
  })
  .then(res => res.json())
  .then((like_obj) => {
    e.target.previousElementSibling.innerText = `${moreLikes} likes`
  })
}

function createToyInfoCard(toy) {
  
    let cardName = document.createElement('h2');
    cardName.innerText = toy.name;

    let cardImg = document.createElement('img');
    cardImg.setAttribute('src', toy.image);
    cardImg.setAttribute('class', 'toy-avatar');

    let cardLikes = document.createElement('p');
    cardLikes.innerText = `${toy.likes} likes`;

    let cardLikeBtn = document.createElement('button');
    cardLikeBtn.setAttribute('class', 'like-btn');
    cardLikeBtn.setAttribute('id', toy.id);
    cardLikeBtn.innerText = "Like <3";
    cardLikeBtn.addEventListener('click', (e) => {
      likes(e);
    })

    let toyCard = document.createElement('div');
    toyCard.setAttribute('class', 'card');
    toyCard.append(cardName, cardImg, cardLikes, cardLikeBtn);
    toyCollection.append(toyCard);
  
}

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
    toyFormContainer.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyFormContainer.style.display = "none";
  }
});

//get all toys

getToys().then(toys => {
  toys.forEach(toy => {
    createToyInfoCard(toy)
  })
})