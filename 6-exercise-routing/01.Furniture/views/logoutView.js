import page from "../node_modules/page/page.mjs";
import { get } from "../src/api.js";
import { updateNav } from "../src/app.js";
import { userData } from "../src/userDataHelper.js";

export async function logoutView() {
  await get("users/logout");
  userData.clearUserData();
  updateNav();
  page.redirect("/");
}
