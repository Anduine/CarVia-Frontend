import { useState } from "react";
import { registerUser } from "../../services/User.service";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phonenumber: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    registerUser(formData)
      .then((data) => {
        const token = data;
        localStorage.setItem("token", token);

        onRegisterSuccess?.();
        navigate("/profile");
      })
      .catch((error) => {
        setError(error.response?.data || "Помилка реєстрації");
        console.log(error);
      });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Реєстрація</h2>
      <input name="login" placeholder="Логін" value={formData.login} onChange={handleChange} required />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="first_name" placeholder="Ім’я" value={formData.first_name} onChange={handleChange} required />
      <input name="last_name" placeholder="Прізвище" value={formData.last_name} onChange={handleChange} required />
      <input name="phonenumber" placeholder="Телефон" value={formData.phonenumber} onChange={handleChange} required />
      <input name="address" placeholder="Адреса" value={formData.address} onChange={handleChange} required />
      <button type="submit">Зареєструватися</button>
      <span
        className="form-switcher"
        onClick={(e) => {
          e.preventDefault();
          navigate("/login");
        }}
      >
        Увійти
      </span>
      <div className={`auth-error-wrapper ${error ? "show" : ""}`}>
        {error && <div className="auth-error">{error}</div>}
      </div>
    </form>
  );
};

export default RegisterForm;
