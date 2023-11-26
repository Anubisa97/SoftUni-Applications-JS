const register = document.getElementById("registerView");
const main = document.getElementById("main");

export function showRegister() {
  main.replaceChildren(register);
}
