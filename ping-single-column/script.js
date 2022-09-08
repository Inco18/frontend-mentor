"use strict";

const errMsg = document.querySelector(".error-message");
const input = document.querySelector("input");
const button = document.querySelector("button");
const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let timeout;

const showError = function () {
  if (timeout) clearTimeout(timeout);
  errMsg.style.display = "block";
  setTimeout(() => {
    errMsg.classList.add("error");
    input.classList.add("error");
  }, 0);
};

const hideError = function () {
  errMsg.classList.remove("error");
  input.classList.remove("error");
  timeout = setTimeout(() => {
    errMsg.style.display = "none";
  }, 200);
};

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!emailRegEx.test(input.value)) {
    showError();
  } else {
    button.disabled = true;
    button.textContent = "Subscribed";
    input.disabled = true;
    input.value = "";
  }
});

input.addEventListener("input", function () {
  hideError();
});
