"use strict";

const blogContainer = document.querySelector("#blog-section-container");
const inputText = document.querySelector("#search-text");
const navBtn = document.querySelector(".nav-btn");
const navMenu = document.querySelector("nav");
const overlay = document.querySelector(".overlay");
const overlayBtn = document.querySelector(".overlay button");

const container = [];

// navigation

navBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");

  if (navMenu.classList.contains("show")) {
    navBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
    navBtn.style.color = "#ffff";
  } else {
    navBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    navBtn.style.color = "#443b3e";
  }
});
const placesContainer = [];

// fetching data
async function getData() {
  try {
    const data = await fetch("./data.json");
    const results = await data.json();

    results.forEach((data) => {
      const placeCard = document.createElement("div");
      placesContainer.push(placeCard);
      placeCard.className = "blog-card";
      placeCard.innerHTML = `
      <div class="blog-card-img">
       <img src="${data.image}" alt=${data.name} >
      </div>
      <div class="blog-card-text">
       <h3>${data.name}</h3>
       <p>Country : ${data.country}</p>
       <p hidden>${data.content}</p>
      <button >More details</button>
      </div>
    `;

      blogContainer.appendChild(placeCard);
    });
  } catch (error) {
    console.log(error);
  }

  const divContainer = document.querySelectorAll(".blog-card");

  divContainer.forEach((container) => {
    const containerBtn = container.children[1].querySelectorAll("button");
    containerBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        overlay.style.display = "block";
        const parentContainer = e.target.parentElement.parentElement;

        const title = parentContainer.querySelector("h3").textContent;

        const image = parentContainer.querySelector("img").getAttribute("src");
        const country = parentContainer.querySelector(
          ".blog-card-text p:nth-of-type(1)"
        ).textContent;
        const content = parentContainer.querySelector(
          ".blog-card-text p:nth-of-type(2)"
        ).textContent;

        createInfoCard(title, image, country, content);
      });
    });
  });
}

function createInfoCard(title, image, content, country) {
  let infoCard = document.createElement("div");
  infoCard.className = "info-card";
  infoCard.innerHTML = `
  <h1>${title}</h1>
     <div class='info-card-img'>
    
      <img src="${image}" alt=${title}>
     </div>
     <div class='info-text-card'>
    <p>${country}</p>
    <p>${content}</p>
    
     </div>
    
   `;

  document.body.appendChild(infoCard);
}

function filteredData(searchTerm) {
  placesContainer.forEach((place) => {
    if (
      place.children[1]
        .querySelector("h3")
        .innerText.toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      place.classList.remove("hide");
    } else {
      place.classList.add("hide");
    }
  });
}

function removeDisplayInfo() {}

document.addEventListener("DOMContentLoaded", getData);
inputText.addEventListener("input", (e) => filteredData(e.target.value));
overlay.addEventListener("click", () => {
  let infoCard = document.querySelector(".info-card");
  document.body.removeChild(infoCard);
  overlay.style.display = "none";
});

// nav-menu display

function showCurrentYHeight(){ 
  if (window.scrollY > 0) {
    navBtn.style.position = 'fixed'
  }else {
    navBtn.style.position =  'static'
  }
}

window.addEventListener('scroll',showCurrentYHeight)