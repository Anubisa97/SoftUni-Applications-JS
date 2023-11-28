import { register } from "../api/user.js";

const registerView = document.getElementById("registerView");
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

let context = null;

export function showRegister(ctx) {
  context = ctx;
  context.renderer(registerView);
}

async function onSubmit(e) {
  e.preventDefault();
  const fromData = new FormData(e.target);
  const { email, password, repeatPassword } = Object.fromEntries(fromData);

  if (email.length < 3 || password.length < 3 || password !== repeatPassword) {
    return alert("error");
  }

  await register(email, password);
  form.reset();
  context.updateNav();
  context.goTo("/");
}
