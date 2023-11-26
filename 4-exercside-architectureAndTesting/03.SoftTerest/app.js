import { showHome } from "./src/views/homeView.js";
import { showLogin } from "./src/views/loginView.js";
import { showRegister } from "./src/views/registerView.js";
import { showDashboard } from "./src/views/dashboardView.js";
import { showDetails } from "./src/views/detailsView.js";
import { showCreate } from "./src/views/createView.js";

document.getElementById("section").remove();
document.querySelector("nav").addEventListener("click", onNavigate);

const routs = {
  "/": showHome,
  "/dashboard": showDashboard,
  "/create": showCreate,
  "/login": showLogin,
  "/register": showRegister,
  "/logout": () => {
    console.log("logout");
  },
};

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
  routs[viewName]();
}
