import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { catalogView } from "../views/catalogView.js";
import { dashboardView } from "../views/dashboardView.js";
import { createView } from "../views/createView.js";
import { myFurnitureView } from "../views/myFurnitureView.js";
import { loginView } from "../views/loginView.js";
import { registerView } from "../views/registerView.js";
import { logoutView } from "../views/logoutView.js";
import { editView } from "../views/editView.js";
import { detailsView } from "../views/detailsView.js";
import { userData } from "./userDataHelper.js";

const userNav = document.getElementById("user");
const guestNav = document.getElementById("guest");

page("/", catalogView);
page("/catalog", catalogView);
page("/create", createView);
page("/dashboard", dashboardView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page("/login", loginView);
page("/logout", logoutView);
page("/myFurniture", myFurnitureView);
page("/register", registerView);

updateNav();
page.start();

export function updateNav() {
  const userInfo = userData.getUserData();

  if (userInfo) {
    userNav.style.display = "inline";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "inline";
  }
}
