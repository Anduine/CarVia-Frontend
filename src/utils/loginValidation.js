export default function validateLogin({ login, email, password }) {
  const errors = {};

  if (!login.trim()) {
    errors.login = "Логін обов’язковий";
  }

  if (!email.trim()) {
    errors.email = "Email обов’язковий";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
    errors.email = "Неправильний формат email";
  }

  if (!password.trim()) {
    errors.password = "Пароль обов’язковий";
  } else if (password.length < 4) {
    errors.password = "Пароль має бути не менше 4 символів";
  }

  return errors;
}
