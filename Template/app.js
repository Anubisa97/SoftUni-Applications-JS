import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { userServices } from "./src/userService.js";
import { userHelper } from "./src/userHelper.js";

const root = // Add root element
const userA = // Add user Nav
const guestA = // Add guest Nav

page(decorationContext)
page("/logout", logout)

page.start()
updateNav()

async function logout() {
    await userServices.logout()
    updateNav()
    goTo("/")
}

function renderer(template) {
    render(template, root)
}

export function updateNav() {
    const userData = userHelper.getUserData();
  
    if (userData) {
      userA.forEach(a => a.style.display = "inline");;
      guestA.forEach(a => a.style.display = "none");
    } else {
        userA.forEach(a => a.style.display = "none");
        guestA.forEach(a => a.style.display = "inline");
    }
  }

  function goTo(path) {
    page.redirect(path)
  }

  function decorationContext(ctx, next) {
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;

    next()
  }