"use strict";

const cardNumberVis = document.querySelector(".card-number");
const cardNameVis = document.querySelector(".card-name");
const cardExpVis = document.querySelector(".card-exp");
const cardCvcVis = document.querySelector(".card-cvc");

const formElement = document.querySelector("form");
const nameInput = formElement.querySelector("input[name=card-name]");
const numInput = formElement.querySelector("input[name=card-num]");
const monthInput = formElement.querySelector("input[name=month]");
const yearInput = formElement.querySelector("input[name=year]");
const cvcInput = formElement.querySelector("input[name=cvc]");

const actDate = new Date();

let nameError, numError, expError, cvcError, timeout;

// FUNCTIONS

const minMaxValues = function (min, max, inputEl) {
  parseInt(inputEl.value.replace(/[' ']/g, "")) <= min
    ? (inputEl.value = min)
    : parseInt(inputEl.value.replace(/[' ']/g, "")) > max
    ? (inputEl.value = max)
    : "";
};

const fillToLength = function (finalLength, inputEl) {
  let zeros = "";

  for (
    let j = 1;
    j <= finalLength - inputEl.value.replace(/[' ']/g, "").length;
    j++
  ) {
    zeros += "0";
  }

  if (inputEl.value.replace(/[' ']/g, "").length > finalLength) {
    inputEl.value =
      zeros +
      inputEl.value.slice(
        inputEl.value.replace(/[' ']/g, "").length - finalLength
      );
  } else {
    inputEl.value = zeros + inputEl.value.slice(-inputEl.value.length);
  }
};

const showError = function (element, message) {
  clearTimeout(timeout);
  const paragraph = element.closest("label").querySelector("p");
  paragraph.textContent = message;
  paragraph.classList.add("error-visible");
  paragraph.classList.remove("error-hidden");
  element.classList.add("error-visible");
};

const hideError = function (element) {
  const paragraph = element.closest("label").querySelector("p");
  element.classList.remove("error-visible");
  paragraph.classList.remove("error-visible");
  timeout = setTimeout(() => {
    paragraph.classList.add("error-hidden");
    paragraph.textContent = "";
  }, 200);
};

// EVENT LISTENERS

// Display form inputs on cards and hide error
formElement.addEventListener("input", function (e) {
  hideError(e.target);

  switch (e.target.name) {
    case "card-name":
      nameError = undefined;
      e.target.value = e.target.value.trimStart();
      cardNameVis.textContent = e.target.value;
      break;

    case "card-num":
      numError = undefined;
      minMaxValues(0, 9999999999999999n, e.target);

      fillToLength(16, e.target);

      e.target.value = e.target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();

      cardNumberVis.textContent = e.target.value;
      break;

    case "month":
      expError = undefined;
      minMaxValues(0, 12, e.target);

      fillToLength(2, e.target);

      yearInput.value === ""
        ? (cardExpVis.textContent = e.target.value + "/00")
        : (cardExpVis.textContent = e.target.value + "/" + yearInput.value);
      break;

    case "year":
      expError = undefined;
      minMaxValues(0, 99, e.target);

      fillToLength(2, e.target);

      monthInput.value === ""
        ? (cardExpVis.textContent = "00/" + e.target.value)
        : (cardExpVis.textContent = monthInput.value + "/" + e.target.value);
      break;

    case "cvc":
      cvcError = undefined;
      minMaxValues(0, 999, e.target);

      fillToLength(3, e.target);
      cardCvcVis.textContent = e.target.value;
      break;

    default:
      break;
  }
});

// Submit form
formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  formElement.querySelectorAll("input").forEach((inputEl) => {
    switch (inputEl.name) {
      case "card-name":
        if (inputEl.value.trim().length === 0) {
          showError(inputEl, "Can't be blank");
          nameError = true;
        }

        if (/[^A-Za-z'' ']/.test(inputEl.value)) {
          showError(inputEl, "Wrong format, letters only");
          nameError = true;
        }
        break;

      case "card-num":
        if (inputEl.value.trim().length === 0) {
          showError(inputEl, "Can't be blank");
          numError = true;
        }

        if (/[^0-9' ']/.test(inputEl.value)) {
          showError(inputEl, "Wrong format, numbers only");
          numError = true;
        }
        break;

      case "month":
      case "year":
        if (inputEl.value.trim().length === 0) {
          showError(inputEl, "Can't be blank");
          expError = true;
        }

        const inputDate = new Date();
        inputDate.setMonth(monthInput.value - 1);
        inputDate.setFullYear(20 + yearInput.value);
        if (!(inputEl.value.trim().length === 0) && inputDate < actDate) {
          showError(inputEl, "Invalid date");
          expError = true;
        }
        break;

      case "cvc":
        if (inputEl.value.trim().length === 0) {
          showError(inputEl, "Can't be blank");
          cvcError = true;
        }

        if (/[^0-9]/.test(inputEl.value)) {
          showError(inputEl, "Wrong format, numbers only");
          cvcError = true;
        }

        break;

      default:
        break;
    }
  });

  if (!nameError && !numError && !expError && !cvcError) {
    formElement.classList.add("hidden");
    document.querySelector(".thank-you").classList.remove("hidden");
  }
});

// Continue button
document.getElementById("continue").addEventListener("click", function () {
  location.reload();
});
