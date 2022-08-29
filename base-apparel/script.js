"use strict";

const form = document.getElementById("email-form");
const input = form.querySelector("input");
const errMsg = form.querySelector(".error-message");
const errIcon = form.querySelector(".error-icon");

const regExEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const showError = function () {
  form.classList.add("error");
  errMsg.classList.add("error");
  errIcon.classList.add("error");
  setTimeout(() => (errIcon.style.zIndex = "1"), 150);
};

const hideError = function () {
  form.classList.remove("error");
  errMsg.classList.remove("error");
  errIcon.classList.remove("error");
  errIcon.style.zIndex = "-1";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!regExEmail.test(input.value)) {
    showError();
  } else {
    window.location.reload();
  }
});

input.addEventListener("keydown", function () {
  hideError();
});
