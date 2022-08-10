"use strict";

// SELECTIONS
const gridContainer = document.getElementById("grid");
const difficulties = ["newbie", "junior", "intermediate", "advanced", "guru"];

// FUNCTIONS

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
            <a href="https://inco18.github.io/frontend-mentor/${data[i].name}" class="site-link"><h4>${data[i].title}</h4></a>
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
gridContainer.addEventListener("click", function (e) {
  // ABILITY TO CLICK GITHUB AND FM LINKS
  if (e.target.closest("a:not(.site-link)")) {
    return;
  }
  // OPEN WEBSITE
  if (e.target.closest(".challenge") && !window.getSelection().toString()) {
    e.target.closest(".challenge").querySelector(".site-link").click();
  }
});
