const initialCards = [
    {name: "Val Thorens", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"},
    {name: "Restaurant terrace", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"},
    {name: "An outdoor cafe", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"},
    {name: "A very long bridge, over the forest that keeps on bridgin'", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},
    {name: "Tunnel with morning light", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"},
    {name: "Tunnel with morning light", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"},
];
console.log(initialCards);

const profileEditButton = document.querySelector(".profile__edit-btn");
const modal = document.querySelector("#edit-profile-modal");

const profileName = document.querySelector("#name-input");
const profileDescription = document.querySelector("#description-input");
const modalSubmit = document.querySelector("#submit-button");
const nameOnPage = document.querySelector(".profile__name");
const descriptionOnPage = document.querySelector(".profile__description");

function openModal(){
  profileName.value = nameOnPage.textContent;
  profileDescription.value = descriptionOnPage.textContent;
  modal.classList.add("modal__opened");
}



const modalExitButton = document.querySelector("#exit-button");

function closeModal(){
    modal.classList.remove("modal__opened");
}


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameOnPage.textContent = profileName.value;
  descriptionOnPage.textContent = profileDescription.value;
  closeModal();
}

modalExitButton.addEventListener("click", closeModal);
profileEditButton.addEventListener( "click", openModal);
modalSubmit.addEventListener("submit", handleProfileFormSubmit);

let templateElement = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");


function getCardElement(data){
  console.log(data);
const cardElement = templateElement.content.querySelector(".card").cloneNode(true);
const cardName = cardElement.querySelector(".card__title");
const cardsImage = cardElement.querySelector(".card__image").src = data.link;
const cardsImageText = cardElement.querySelector("#card-image-content").alt = data.name;
cardName.textContent = data.name;
return cardElement;v
}

for (let i = 0; i < initialCards.length; i++){
   const cardsElement = getCardElement(initialCards[i]);
   cardsList.prepend(cardsElement);
}
console.log(cardElement);