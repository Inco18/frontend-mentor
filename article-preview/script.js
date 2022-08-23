const socialsHtml = `
  <div class="social-links">
    <span>SHARE</span>
    <a href="https://facebook.com"
      ><i class="fa-brands fa-square-facebook"></i></a
    ><a href="https://twitter.com">
      <i class="fa-brands fa-twitter"></i></a
    ><a href="https://pinterest.com"
      ><i class="fa-brands fa-pinterest"></i
    ></a>
  </div>
`;
const shareIcon = document.querySelector(".share-icon");
let element, type;

const toggleSocials = function (parentElement) {
  if (element) {
    shareIcon.classList.remove("active");
    element.remove();
    element = undefined;
  } else {
    shareIcon.classList.add("active");
    parentElement.insertAdjacentHTML("beforeend", socialsHtml);
    element = parentElement.lastElementChild;
  }
};

// EVENT LISTENERS

shareIcon.addEventListener("click", function () {
  if (document.documentElement.clientWidth > 650) {
    toggleSocials(shareIcon);
    type = "desktop";
  } else {
    toggleSocials(document.querySelector("main"));
    type = "mobile";
  }
});

// Change html position on window resize
window.addEventListener("resize", function () {
  if (
    document.documentElement.clientWidth > 650 &&
    type === "mobile" &&
    element
  ) {
    element.remove();
    element = undefined;
    toggleSocials(shareIcon);
    type = "desktop";
  }
  if (
    document.documentElement.clientWidth <= 650 &&
    type === "desktop" &&
    element
  ) {
    element.remove();
    element = undefined;
    toggleSocials(document.querySelector("main"));
    type = "mobile";
  }
});
