
const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn-disabled",
    inputErrorClass: "modal__input-type-error",
    errorClass: "modal__error" 
}

function resetValidation(formEl, config) {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonElement = formEl.querySelector(config.submitButtonSelector);
  
    inputList.forEach((inputElement) => {
      hideInputError(formEl, inputElement, config);
      checkInputValidity(formEl, inputElement, config);
    });
  
    toggleButtonState(inputList, buttonElement, config);
  }

const showInputError = (formEl, inputElement, config, errorMessage) => {
    const errorMessageID = inputElement.id + "-error";
    const errorMessageEl = formEl.querySelector("#" + errorMessageID);
    errorMessageEl.textContent = errorMessage;
    inputElement.classList.add(config.inputErrorClass);
    
};

const hideInputError = (formEl, inputElement, config) => {
    const errorMessageID = inputElement.id + "-error";
    const errorMessageEl = formEl.querySelector("#" + errorMessageID);
    errorMessageEl.textContent = "";
    inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputElement, config) =>{
    if(!inputElement.validity.valid) {
        showInputError(formEl, inputElement, config, inputElement.validationMessage);
    } else {
        hideInputError(formEl, inputElement, config);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => 
        !input.validity.valid);
  };


const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)){
       disabledButton(buttonElement, config);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
 };

 const disabledButton = (buttonElement, config) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
 };

const setEventListeners = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonElement = formEl.querySelector(config.submitButtonSelector);

    
     toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formEl, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};


const enableValidation = (config) => {
    const formList = (document.querySelectorAll(config.formSelector));
    formList.forEach((formEl) => {
        setEventListeners(formEl, config);
    });
};

enableValidation(settings);


