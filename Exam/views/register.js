import { html } from "../node_modules/lit-html/lit-html.js";
import { userServices } from "../src/userService.js";

const registerTemp = () => html` <section id="register">
  <div class="form">
    <img class="border" src="./images/border.png" alt="" />
    <h2>Register</h2>
    <form @submit=${submitHandler} class="register-form">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
    <img class="border" src="./images/border.png" alt="" />
  </div>
</section>`;

let context = "";
export function registerView(ctx) {
  context = ctx;
  ctx.render(registerTemp());
}

async function submitHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const {
    email,
    password,
    "re-password": rePassword,
  } = Object.fromEntries(formData);
  if (!email || !password || !rePassword || password !== rePassword) {
    return window.alert("Missing input");
  }

  await userServices.register(email, password);
  context.updateNav();
  context.goTo("/");
}
