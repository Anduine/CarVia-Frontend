export default function validateRegister(formData) {
  const errors = {};

  if (!formData.login.trim()) {
    errors.login = "Логін обов’язковий";
  }

  if (!formData.password.trim()) {
    errors.password = "Пароль обов’язковий";
  } else if (formData.password.length < 4) {
    errors.password = "Пароль має бути не менше 4 символів";
  }

  if (!formData.email.trim()) {
    errors.email = "Email обов’язковий";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(formData.email)) {
    errors.email = "Неправильний формат email";
  }

  if (!formData.first_name.trim()) {
    errors.first_name = "Ім’я обов’язкове";
  }

  if (!formData.last_name.trim()) {
    errors.last_name = "Прізвище обов’язкове";
  }

  if (!formData.phonenumber.trim()) {
    errors.phonenumber = "Телефон обов’язковий";
  } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(formData.phonenumber)) {
    errors.phonenumber = "Невірний формат телефону";
  }

  if (!formData.address.trim()) {
    errors.address = "Адреса обов’язкова";
  }

  return errors;
}
