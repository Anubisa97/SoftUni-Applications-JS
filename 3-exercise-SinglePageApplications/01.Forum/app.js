import { showHome } from "./homeView.js";
const homeButton = document.querySelector("li a");
homeButton.addEventListener("click", showHome);
showHome();
