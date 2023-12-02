import { html } from "../node_modules/lit-html/lit-html.js";
import { userServices } from "../src/userService.js";

const loginTemp = () => html`
  <section id="login">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Login</h2>
      <form @submit=${submitHandler} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
      <img class="border" src="./images/border.png" alt="" />
    </div>
  </section>
`;

let context = "";
export function loginView(ctx) {
  ctx.render(loginTemp());
  context = ctx;
}

async function submitHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  if (!email || !password) {
    return window.alert("Missing input");
  }

  await userServices.login(email, password);
  context.updateNav();
  context.goTo("/");
}
