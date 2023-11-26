const login = document.getElementById("loginView");
const main = document.getElementById("main");

export function showLogin() {
  main.replaceChildren(login);
}
