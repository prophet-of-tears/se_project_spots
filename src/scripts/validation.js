export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input-type-error",
  errorClass: "modal__error",
};

const buttonElement = validationConfig.submitButtonSelector;

export function resetValidation(formEl, validationConfig) {
  const inputList = Array.from(
    formEl.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formEl.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formEl, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
}

const showInputError = (
  formEl,
  inputElement,
  validationConfig,
  errorMessage
) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageEl = formEl.querySelector("#" + errorMessageID);
  errorMessageEl.textContent = errorMessage;
  inputElement.classList.add(validationConfig.inputErrorClass);
};

const hideInputError = (formEl, inputElement, validationConfig) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageEl = formEl.querySelector("#" + errorMessageID);
  errorMessageEl.textContent = "";
  inputElement.classList.remove(validationConfig.inputErrorClass);
};

const checkInputValidity = (formEl, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formEl,
      inputElement,
      validationConfig,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formEl, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, validationConfig);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

export const disabledButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

const setEventListeners = (formEl, validationConfig) => {
  const inputList = Array.from(
    formEl.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formEl.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, validationConfig);
  });
};
