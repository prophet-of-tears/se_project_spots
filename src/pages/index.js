import "./index.css";
import {
  enableValidation,
  validationConfig,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7d7be5a5-1836-4244-ab98-203b9c71441d",
    "content-type": "application/json",
  },
});

const cardsList = document.querySelector(".cards__list");

api
  .getAppInfo()
  .then(([initialCards, userInfo]) => {
    initialCards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });

    nameOnPage.textContent = userInfo.about;
    descriptionOnPage.textContent = userInfo.name;

    avatarModalBtn.src = userInfo.avatar;
  })
  .catch(console.error);

const profileEditButton = document.querySelector("#edit-modal");
const profileModal = document.querySelector("#edit-profile-modal"); // edit modal div
const newPostModal = document.querySelector("#new-post-modal"); // image modal div

const profileName = document.querySelector("#name-input");
const profileDescription = document.querySelector("#description-input");
const profileForm = document.querySelector(".modal__form"); // edit form
const nameOnPage = document.querySelector("#profile-name");
const descriptionOnPage = document.querySelector("#profile-description");
const profileExitButton = profileModal.querySelector("#exit-button"); // exit button for both modals
const profileSubmitBtn = profileModal.querySelector(".modal__submit-btn");

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

// avatar modal
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarCloseBtn = document.querySelector("#avatar-exit-button");
const avatarSubmitButton = document.querySelector("#avatar-submit-button");
const avatarForm = document.querySelector("#edit-avatar-form");
const avatarImg = document.querySelector(".profile__avatar");
const avatarInput = document.querySelector("#avatar-input");

//delete card Modal
const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteForm = document.querySelector("#delete-card-form");
const deleteExitBtn = document.querySelector(".modal__delete-exit-btn");
const deleteCancel = document.querySelector("#delete-card-cancel");
const deleteSubmitBtn = document.querySelector("#delete-submit-button");

let selectedCard;
let selectedCardId;

newModalCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(newPostModal);
});

profileExitButton.addEventListener("click", () => {
  closeModal(profileModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

deleteExitBtn.addEventListener("click", () => {
  closeModal(deleteCardModal);
});

deleteCancel.addEventListener("click", () => {
  closeModal(deleteCardModal);
});

function handleAvatarSubmit(evt) {
  // form for changing Avatar
  evt.preventDefault();
  setButtonText(avatarSubmitButton, true);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      avatarImg.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(avatarSubmitButton, false);
    });
}

function handleNewPost(evt) {
  //new post modal submit
  evt.preventDefault();
  setButtonText(cardSubmitButton, true);

  const name = caption.value;
  const link = imageLink.value;
  api
    .createNewCard(name, link)
    .then((card) => {
      const cardsElement = getCardElement(card);

      cardsList.prepend(cardsElement);
      evt.target.reset();
      closeModal(newPostModal);
      resetValidation(evt.target, validationConfig);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(cardSubmitButton, false);
    });
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

modalImageForm.addEventListener("submit", handleNewPost);

profileEditButton.addEventListener("click", () => {
  profileName.value = nameOnPage.textContent;
  profileDescription.value = descriptionOnPage.textContent;

  openModal(profileModal);
  resetValidation(profileModal, validationConfig);
});

function handleProfileFormSubmit(evt) {
  //form for profile name and description
  evt.preventDefault();
  setButtonText(profileSubmitBtn, true);

  api
    .editUserInfo({ name: profileDescription.value, about: profileName.value })
    .then((data) => {
      nameOnPage.textContent = data.about;
      descriptionOnPage.textContent = data.name;
      closeModal(profileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(profileSubmitBtn, false);
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleDeleteCard(cardElement, cardId) {
  // form for deleting cards
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteCardModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  deleteSubmitBtn.textContent = "DELETING...";
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteSubmitBtn.textContent = "DELETE";
    });
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleLike(evt, data, id) {
  // handling Likes
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-btn_liked");

  api
    .handleLike(isLiked, id)
    .then(() => {
      likeButton.classList.toggle("card__like-btn_liked");
    })
    .catch(console.error);
}

function getCardElement(data) {
  const templateElement = document.querySelector("#card-template");
  const cardElement = templateElement.content
    .querySelector(".card")
    .cloneNode(true);
  const cardName = cardElement.querySelector("#card_title");
  const cardsImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".delete__btn");

  cardName.textContent = data.name;
  cardsImage.alt = data.name;
  cardsImage.src = data.link;

  if (!data.isLiked) {
    likeButton.classList.toggle("card__like-btn_liked");
  }

  likeButton.addEventListener("click", (evt) =>
    handleLike(evt, data.isLiked, data._id)
  );

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
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

enableValidation(validationConfig);
