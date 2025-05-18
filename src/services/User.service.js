import api from "./api";

async function getUser(token) {
  return api
    .get(`/sso/user_profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      //console.error("Помилка отримання профілю користувача: ", error.message);
      throw error;
    });
}

async function loginUser(login, email, password) {
  return api
    .post("/sso/login", { login, email, password })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      //console.error("Помилка авторизації: ", error.message);
      throw error;
    });
}

async function registerUser(formData) {
  console.log(formData);
  return api
    .post("/sso/register", formData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      //console.error("Помилка реєстрації: ", error.message);
      throw error;
    });
}

export { getUser, loginUser, registerUser };
