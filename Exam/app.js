import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { userServices } from "./src/userService.js";
import { userHelper } from "./src/userHelper.js";
import { homeView } from "./views/home.js";
import { addView } from "./views/add.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { likeView } from "./views/like.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";

const root = document.querySelector("main");
const userNav = document.querySelector(".user");
const guestNav = document.querySelector(".guest");

page(decorationContext);
page("/", homeView);
page("/add", addView);
page("/dashboard", dashboardView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page("/like", likeView);
page("/login", loginView);
page("/register", registerView);
page("/logout", logout);

page.start();
updateNav();

async function logout() {
  await userServices.logout();
  updateNav();
  goTo("/");
}

function renderer(template) {
  render(template, root);
}

export function updateNav() {
  const userData = userHelper.getUserData();

  if (userData) {
    userNav.style.display = "block";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "block";
  }
}

function goTo(path) {
  page.redirect(path);
}

function decorationContext(ctx, next) {
  ctx.render = renderer;
  ctx.updateNav = updateNav;
  ctx.goTo = goTo;

  next();
}
