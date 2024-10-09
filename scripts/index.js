const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector("#edit-modal");
const profileModal = document.querySelector("#edit-profile-modal"); // edit modal div
const newPostModal = document.querySelector("#new-post-modal"); // image modal div

const profileName = document.querySelector("#name-input");
const profileDescription = document.querySelector("#description-input");
const profileForm = document.querySelector(".modal__form"); // edit form
const nameOnPage = document.querySelector("#profile-name");
const descriptionOnPage = document.querySelector("#profile-description");
const profileExitButton = profileModal.querySelector("#exit-button"); // exit button for both modals

const cardSubmitButton = newPostModal.querySelector(".modal__submit-btn");
const profileAddButton = document.querySelector(".profile__add-btn");
const modalImageForm = newPostModal.querySelector(".modal__form"); // image Form
const imageLink = newPostModal.querySelector("#link-input");
const caption = newPostModal.querySelector("#caption-input");
const imageSaveButton = newPostModal.querySelector("#save-image");
const newModalCloseButton = newPostModal.querySelector(".modal__exit-btn");

const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");

newModalCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(newPostModal);
});

profileExitButton.addEventListener("click", () => {
  closeModal(profileModal);
});

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: caption.value, link: imageLink.value };
  const cardsElement = getCardElement(inputValues);
  cardsList.prepend(cardsElement);
  evt.target.reset();
  disabledButton(cardSubmitButton, settings);
  closeModal(newPostModal);
}


modalImageForm.addEventListener("submit", handleImageFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileName.value = nameOnPage.textContent;
  profileDescription.value = descriptionOnPage.textContent;
  
  openModal(profileModal);
  resetValidation(profileModal,settings);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameOnPage.textContent = profileName.value;
  descriptionOnPage.textContent = profileDescription.value;
  closeModal(profileModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const templateElement = document.querySelector("#card-template").content;
  const cardElement = templateElement
  .querySelector(".card")
  .cloneNode(true);
  const cardName = cardElement.querySelector("#card_title");
  const cardsImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".delete__btn");

  cardName.textContent = data.name;
  cardsImage.alt = data.name;
  cardsImage.src = data.link;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-btn_liked");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardsImage.addEventListener("click", () => {
    openModal(previewModal);
    previewCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

initialCards.forEach((card) => {
  const cardsElement = getCardElement(card);
  cardsList.append(cardsElement);
});

function handleEscapePress(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function handleModalClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapePress);
  modal.addEventListener("click", handleModalClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapePress);
  modal.removeEventListener("click", handleModalClick);
}
