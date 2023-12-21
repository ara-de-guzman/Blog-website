"use strict";

const imgSelectorBtns = document.querySelectorAll(".img-btn");
const imgHeroContainer = document.querySelector(".hero-image-display");
const mostRecentBtn = document.querySelector("#most-recent-btn");
const popularBtn = document.querySelector("#popular-btn");
const aboutMeBtn = document.querySelector("#about-me-btn");
const recentPostContainer = document.querySelector(".recent-post-container");
const aboutMeContainer = document.querySelector(".about-me-container");
const popularPostContainer = document.querySelector(".popular-post-container");
const swiperContainer = document.querySelector(".swiper-wrapper");
const form = document.querySelector("form");

// about/post section
aboutMeBtn.addEventListener("click", () => {
  showDisplay("flex", "none", "none", 900, 200, 200);
});

mostRecentBtn.addEventListener("click", () => {
  showDisplay("none", "flex", "none", 200, 900, 200);
});

popularBtn.addEventListener("click", () => {
  showDisplay("none", "none", "grid", 200, 200, 900);
});

function showDisplay(display1, display2, display3, num1, num2, num3) {
  aboutMeContainer.style.display = `${display1}`;
  recentPostContainer.style.display = `${display2}`;
  popularPostContainer.style.display = `${display3}`;
  aboutMeBtn.style.fontWeight = num1;
  mostRecentBtn.style.fontWeight = num2;
  popularBtn.style.fontWeight = num3;
}

// hero image selectors

imgSelectorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeActiveSelection();
    let valueImage = btn.getAttribute("value");
    btn.classList.add("active");
    imgHeroContainer.innerHTML = `<img src="images/${valueImage}.jpg" alt="mathew" class="hero-img"/>`
  });
});

function removeActiveSelection() {
  imgSelectorBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
}

// review section
async function getData() {
  try {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/comments?postId=2"
    );
    const results = await data.json();
    results.forEach((result) => {
      swiperContainer.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="swiper-slide swiper-slide-9183">
      <div class="swiper-slide-content swiper-slide-content-2f5e">
        <div
          class="swiper-slide-text swiper-slide-text-5c3d"
          data-swiper-parallax="-100"
        >
        <img src="images/guy.png" alt="guy">
        <p>" ${result.body} "</p>
         <small>${result.email}</small>
        </div>
      </div>
    </div>
      
      `
      );
    });
  } catch (error) {
    console.log(error);
  }
}

getData();

// swiper

var swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 5,
  speed: 1100,
  pagination: { el: ".swiper-pagination" },
  parallax: { enabled: true },
  watchSlidesProgress: true,
  slidesPerGroupAuto: false,
});
