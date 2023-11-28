import { requester } from "./requester.js";
import { userInfo } from "./userHelper.js";

const USER_ENDPOINT = {
  login: "users/login",
  register: "users/register",
  logout: "users/logout",
};

export async function login(email, password) {
  const data = await requester("POST", USER_ENDPOINT.login, {
    email,
    password,
  });
  userInfo("add", data);
  return data;
}

export async function register(email, password) {
  const data = await requester("POST", USER_ENDPOINT.register, {
    email,
    password,
  });
  userInfo("add", data);
  return data;
}

export async function logout() {
  const data = await requester("GET", USER_ENDPOINT.logout);
  userInfo("remove");
  return data;
}
