"use strict";

// CONSTANTS
const gridContainer = document.getElementById("grid");
const difficulties = ["newbie", "junior", "intermediate", "advanced", "guru"];

// FUNCTIONS
function openInNewTab(href) {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    href: href,
  }).click();
}

// DISPLAY ALL CHALLENGES FROM JSON FILE
const getChallenges = async function () {
  try {
    const response = await fetch("./site/challenges.json");
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      // CREATE HTML TO INSERT
      let html = `
        <div class="challenge">
          <div class="design-div">
            <img
              class="design"
              src="${data[i].name}/design/real.png"
              alt="website design"
            />
          </div>
          <div class="desc">
            <a href="./${data[i].name}" class="site-link"><h4>${data[i].title}</h4></a>
            <div class="langs">
              Languages used: `;
      // GENERATE USED LANGUAGES
      data[i].lang.forEach(
        (lang) =>
          (html += `<span class="fw-700 ${lang.toLowerCase()}">${lang} </span>`)
      );
      // CONTINUE CREATING HTML
      html += `</div>
            <p class="difficulty">
              Difficulty:
              <span class="fw-700 ${difficulties[data[i].difficulty - 1]}">${
        difficulties[data[i].difficulty - 1]
      }</span>
            </p>
            <div class="links">
              <a
                href="https://github.com/Inco18/frontend-mentor/tree/main/${
                  data[i].name
                }"
                target="_blank"
                ><i class="fa-brands fa-github"></i
              ></a>
              <a
                href="${data[i]["fm-link"]}"
                target="_blank"
                ><img src="site/icon-transparent.png"
              /></a>
            </div>
          </div>
        </div>
    `;
      // INSERT HTML TO CONTAINER
      gridContainer.insertAdjacentHTML("beforeend", html);
    }
  } catch (err) {
    console.log(err);
  }
};
getChallenges();

// HANDLING CLICKS ON CHALLENGES
gridContainer.addEventListener("mouseup", function (e) {
  // ABILITY TO CLICK GITHUB AND FM LINKS
  if (e.button > 1 || e.target.closest("a")) return;
  // OPEN WEBSITE
  if (e.target.closest(".challenge") && !window.getSelection().toString()) {
    if (e.button === 1) {
      openInNewTab(
        e.target.closest(".challenge").querySelector(".site-link").href
      );
      return;
    }
    e.target.closest(".challenge").querySelector(".site-link").click();
  }
});
gridContainer.addEventListener("mousedown", function (e) {
  if (e.button === 1) e.preventDefault();
});
