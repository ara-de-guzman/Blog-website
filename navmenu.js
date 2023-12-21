const navBtn = document.querySelector(".nav-btn");
const navMenu = document.querySelector("nav");


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

// nav-menu display

function showCurrentYHeight() {
  if (window.scrollY > 0) {
    navBtn.style.position = "fixed";
  } else {
    navBtn.style.position = "static";
  }
}

window.addEventListener("scroll", showCurrentYHeight);