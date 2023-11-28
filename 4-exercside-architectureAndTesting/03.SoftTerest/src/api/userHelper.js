const userAction = {
  add: (data) => sessionStorage.setItem("user", JSON.stringify(data)),
  remove: () => sessionStorage.removeItem("user"),
  get: () => JSON.parse(sessionStorage.getItem("user")),
};

export function userInfo(action, data) {
  return userAction[action](data);
}
