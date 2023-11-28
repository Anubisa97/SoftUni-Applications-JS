import { userInfo } from "./userHelper.js";

const BASE_URL = "http://localhost:3030/";

export async function requester(method, url, data) {
  const URL = BASE_URL + url;
  const user = userInfo("get");
  const option = {
    method,
    headers: {},
  };

  if (data) {
    option.headers["Content-Type"] = "application/json";
    option.body = JSON.stringify(data);
  }
  if (user) {
    option.headers["x-authorization"] = user.accessToken;
  }

  try {
    const response = await fetch(URL, option);
    if (!response.ok) {
      if (response.status === 403) {
        userInfo("remove");
      }
      const error = await response.json();
      throw new Error(error.message);
    }
    if (response.status === 204) {
      return response;
    }
    return response.json();
  } catch (error) {
    alert(error);
    throw error;
  }
}
