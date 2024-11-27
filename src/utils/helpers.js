export function setButtonText(
  btn,
  isLoading,
  defaultText = "SAVE",
  loadingText = "SAVING..."
) {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}

export function setSubmitText(
  btn,
  isLoading,
  defaultText = "DELETE",
  loadingText = "DELETING..."
) {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}
