import { login } from "../api/user.js";
const loginView = document.getElementById("loginView");
const form = loginView.querySelector("form");
form.addEventListener("submit", onSubmit);

let context = null;
export function showLogin(ctx) {
  context = ctx;
  context.renderer(loginView);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);

  if (!email || !password) {
    return alert("Error");
  }

  await login(email, password);
  form.reset();
  context.updateNav();
  context.goTo("/");
}
