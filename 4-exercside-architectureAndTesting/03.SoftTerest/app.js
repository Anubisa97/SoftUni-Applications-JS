import { showHome } from "./src/views/homeView.js";
import { showLogin } from "./src/views/loginView.js";
import { showRegister } from "./src/views/registerView.js";
import { showDashboard } from "./src/views/dashboardView.js";
import { showDetails } from "./src/views/detailsView.js";
import { showCreate } from "./src/views/createView.js";
import { userInfo } from "./src/api/userHelper.js";
import { logout } from "./src/api/user.js";

document.getElementById("section").remove();
const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigate);

const main = document.getElementById("main");
updateNav();

const routs = {
  "/": showHome,
  "/dashboard": showDashboard,
  "/create": showCreate,
  "/login": showLogin,
  "/register": showRegister,
  "/details": showDetails,
  "/logout": async () => {
    await logout();
    updateNav();
    goTo("/");
  },
};

const ctx = {
  renderer,
  goTo,
  updateNav,
};

function renderer(section) {
  main.replaceChildren(section);
}

function updateNav() {
  const user = userInfo("get");
  const userA = nav.querySelectorAll(".user");
  const guestA = nav.querySelectorAll(".guest");
  if (user) {
    userA.forEach((a) => (a.style.display = "block"));
    guestA.forEach((a) => (a.style.display = "none"));
  } else {
    userA.forEach((a) => (a.style.display = "none"));
    guestA.forEach((a) => (a.style.display = "block"));
  }
}

function onNavigate(e) {
  e.preventDefault();
  if (e.target.tagName !== "A" && e.target.tagName !== "IMG") {
    return;
  }
  let target = e.target;
  if (target.tagName === "IMG") {
    target = target.parentElement;
  }

  const viewName = new URL(target.href).pathname;
  goTo(viewName);
}

function goTo(name, ...params) {
  const handler = routs[name];
  handler(ctx, params);
}
