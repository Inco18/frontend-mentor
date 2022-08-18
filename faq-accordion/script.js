"use strict";

let prevEl;

document
  .querySelector(".faq-container")
  .addEventListener("click", function (e) {
    const parentEl = e.target.closest(".question-container");
    if (!parentEl) return;
    if (prevEl) {
      prevEl.querySelector(".answer").classList.add("hidden");
      prevEl.querySelector(".question").classList.remove("active");
      prevEl.querySelector("img").style.transform = "rotate(0deg)";
      if (prevEl?.textContent === parentEl.textContent)
        return (prevEl = undefined);
    }
    prevEl = parentEl;

    parentEl.querySelector("img").style.transform = "rotate(180deg)";
    parentEl.querySelector(".answer").classList.remove("hidden");
    parentEl.querySelector(".question").classList.add("active");
  });
