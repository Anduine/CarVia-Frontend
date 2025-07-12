import api from "./api";

async function getUserProfile() {
  return api.get(`/sso/user_profile`);
}

async function updateUserProfile(userData) {
  const formData = new FormData();
  for (const key in userData) {
    formData.append(key, userData[key]);
  }

  return api.put("/sso/update_user_profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function loginUser(login, email, password) {
  return api.post(
    "/sso/login",
    { login, email, password },
    {
      headers: {
        Authorization: undefined,
      },
    }
  );
}

async function registerUser(formData) {
  return api.post("/sso/register", formData, {
    headers: {
      Authorization: undefined,
    },
  });
}

export { getUserProfile, updateUserProfile, loginUser, registerUser };
