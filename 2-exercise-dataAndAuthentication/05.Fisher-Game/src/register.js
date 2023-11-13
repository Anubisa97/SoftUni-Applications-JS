document.querySelector("form").addEventListener("submit", registerHandler);

const logoutRef = document.getElementById("logout");
logoutRef.style.display = "none";

async function registerHandler(e) {
  const uri = "http://localhost:3030/users/register";
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const rePass = formData.get("rePass");
  if (!email && !password && !rePass && rePass !== password) {
    throw window.alert("error");
  }
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  try {
    const response = await fetch(uri, data);
    if (response.status !== 200) {
      throw (
        (new Error("Email already registered"),
        window.alert("Email already registered"))
      );
    }
    const userData = await response.json();
    sessionStorage.setItem("email", userData.email);
    sessionStorage.setItem("userId", userData._id);
    sessionStorage.setItem("accessToken", userData.accessToken);
    window.location.href = "./index.html";
  } catch (error) {
    throw new Error(error);
  }
}
