import { api } from "./api.js";
import { userHelper } from "./userHelper.js";

const userEndPoints = {
  login: "*",
  register: "*",
  logout: "*",
};

async function register(email, user, password) {
  const data = await api.post(userEndPoints.register, {
    user,
    email,
    password,
  });
  userHelper.setUserData(data);
}

async function login(email, password) {
  const data = await api.post(userEndPoints.login, { email, password });
  userHelper.setUserData(data);
}

async function logout() {
  await api.get(userEndPoints.logout);
  userHelper.removeUserData();
}

export const userServices = {
  register,
  login,
  logout,
};
