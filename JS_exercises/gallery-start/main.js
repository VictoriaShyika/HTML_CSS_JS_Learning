let displayedImage = document.querySelector(".displayed-img");
let thumbBar = document.querySelector(".thumb-bar");

let button = document.querySelector("button");
let overlay = document.querySelector(".overlay");

let images = ["pic1.jpeg", `pic2.jpeg`, `pic3.jpeg`, `pic4.jpeg`, `pic5.jpeg`];

for (let image of images) {
  let newImage = document.createElement("img");
  newImage.setAttribute("src", `images/${image}`);
  thumbBar.appendChild(newImage);

  newImage.onclick = function () {
    displayedImage.setAttribute("src", newImage.getAttribute("src"));
  };
}

button.onclick = function () {
  let buttonClass = button.getAttribute("class");
  if (buttonClass === "dark") {
    button.setAttribute("class", "light");
    button.textContent = "Светлее";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    button.setAttribute("class", "dark");
    button.textContent = "Темнее";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
};
