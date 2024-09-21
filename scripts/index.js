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


const profileEditButton = document.querySelector("#edit-modal");
const modal = document.querySelector("#edit-profile-modal"); // edit modal div
const newModal = document.querySelector("#new-post-modal"); // image modal div
const modalClose = document.querySelector("#close-Button"); // was attached to exit button for the add button

const profileName = document.querySelector("#name-input");
const profileDescription = document.querySelector("#description-input");
const profileForm = document.querySelector(".modal__form"); // edit form
const nameOnPage = document.querySelector("#profile-name");
const descriptionOnPage = document.querySelector("#profile-description");
const modalExitButton = modal.querySelector("#exit-button"); // exit button for both modals

const profileAddButton = document.querySelector(".profile__add-btn");
const modalImageForm = newModal.querySelector(".modal__form"); // image Form
const imageLink = newModal.querySelector("#link-input");
const caption = newModal.querySelector("#caption-input");
const imageSaveButton = newModal.querySelector("#save-image");
const newModalCloseButton = newModal.querySelector(".modal__exit-btn");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
}


newModalCloseButton.addEventListener("click", () =>{
  closeModal(newModal);
});


profileAddButton.addEventListener("click", () => {
  openModal(newModal);
});


modalExitButton.addEventListener("click", () => {
  closeModal(modal);
});


function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {name: caption.value, link: imageLink.src};
  const cardsElement = getCardElement(inputValues);
  cardsList.prepend(cardsElement);
 closeModal(newModal);
};

modalImageForm.addEventListener("submit", handleImageFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileName.value = nameOnPage.textContent;
  profileDescription.value = descriptionOnPage.textContent;
  openModal(modal);
});



function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameOnPage.textContent = profileName.value;
  descriptionOnPage.textContent = profileDescription.value;
  closeModal(modal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);


const cardsList = document.querySelector(".cards__list");

function getCardElement(data){
  const templateElement = document.querySelector("#card-template").content;
  const cardElement = templateElement
  .querySelector(".card")
  .cloneNode(true);
const cardName = cardElement.querySelector("#card_title");
const cardsImage = cardElement.querySelector("#card_image_content");
cardName.textContent = data.name;
cardsImage.alt = data.name;
cardsImage.src = data.link;

return cardElement;
};



initialCards.forEach((card) => {
  const cardsElement = getCardElement(card);
  cardsList.append(cardsElement);
  return card;
});
