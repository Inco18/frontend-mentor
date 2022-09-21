"use strict";

const notificationsNumberElement = document.querySelector(
  ".notifications_number"
);

const notificationElements = document.querySelectorAll(".notifications li");

document.getElementById("mark-all").addEventListener("click", function () {
  notificationsNumberElement.textContent = "0";
  notificationElements.forEach((el) => el.classList.remove("unread"));
});
