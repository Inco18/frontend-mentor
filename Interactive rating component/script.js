"use strict";

const main = document.getElementById("main");
const thankYou = document.getElementById("thank_you");
document.getElementById("btn-submit").addEventListener("click", function () {
  const checked = document.querySelector("input[name=rating]:checked");
  if (checked) {
    main.classList.add("hidden");
    thankYou.classList.remove("hidden");
    document.querySelector(
      ".selected-info"
    ).textContent = `You selected ${checked.value} out of 5`;
  }
});
