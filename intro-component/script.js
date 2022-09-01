"use strict";

const form = document.querySelector("form");
const labels = form.querySelectorAll("label");
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const showError = function (element, message) {
  element.querySelector("img").classList.remove("hidden");
  element.querySelector("p").classList.remove("hidden");
  element.querySelector("p").textContent = message;
  element.classList.add("error");
};

const hideError = function (element) {
  element.querySelector("img").classList.add("hidden");
  element.querySelector("p").classList.add("hidden");
  element.querySelector("p").textContent = "";
  element.classList.remove("error");
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let success = true;

  labels.forEach((label) => {
    hideError(label);
    const input = label.firstElementChild;

    if (
      input.id === "email" &&
      input.value.length > 0 &&
      !emailRegex.test(input.value)
    ) {
      showError(label, `Looks like this is not an email`);
      success = false;
      return;
    }

    if (input.value.length === 0) {
      showError(label, `${input.placeholder} cannot be empty`);
      success = false;
      return;
    }
  });

  if (success === true) {
    const button = document.querySelector("button");
    button.textContent = "Free trial claimed succesfully";
    button.disabled = true;

    labels.forEach((label) => {
      label.firstElementChild.value = "";
      label.firstElementChild.disabled = true;
    });
  }
});

form.addEventListener("keydown", function (e) {
  hideError(e.target.closest("label"));
});
