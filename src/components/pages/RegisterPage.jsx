import { useState } from "react";
import { registerUser } from "../../services/User.service";
import { useNavigate } from "react-router-dom";
import validateRegister from "../../utils/registerValidation";

const RegisterPage = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phonenumber: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    const errors = validateRegister(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    registerUser(formData)
      .then((response) => {
        const token = response.data.token;
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
    <div className="register-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Реєстрація</h1>

        <input name="login" placeholder="Логін" value={formData.login} onChange={handleChange} />
        {validationErrors.login && (
          <div className={`error-wrapper ${validationErrors.login ? "show" : ""}`}>
            <div className="input-error">{validationErrors.login}</div>
          </div>
        )}

        <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} />
        {validationErrors.password && (
          <div className={`error-wrapper ${validationErrors.password ? "show" : ""}`}>
            <div className="input-error">{validationErrors.password}</div>
          </div>
        )}

        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {validationErrors.email && (
          <div className={`error-wrapper ${validationErrors.email ? "show" : ""}`}>
            <div className="input-error">{validationErrors.email}</div>
          </div>
        )}

        <input name="first_name" placeholder="Ім’я" value={formData.first_name} onChange={handleChange} />
        {validationErrors.first_name && (
          <div className={`error-wrapper ${validationErrors.first_name ? "show" : ""}`}>
            <div className="input-error">{validationErrors.first_name}</div>
          </div>
        )}

        <input name="last_name" placeholder="Прізвище" value={formData.last_name} onChange={handleChange} />
        {validationErrors.last_name && (
          <div className={`error-wrapper ${validationErrors.last_name ? "show" : ""}`}>
            <div className="input-error">{validationErrors.last_name}</div>
          </div>
        )}

        <input name="phonenumber" placeholder="Телефон" value={formData.phonenumber} onChange={handleChange} />
        {validationErrors.phonenumber && (
          <div className={`error-wrapper ${validationErrors.phonenumber ? "show" : ""}`}>
            <div className="input-error">{validationErrors.phonenumber}</div>
          </div>
        )}

        <input name="address" placeholder="Адреса" value={formData.address} onChange={handleChange} />
        {validationErrors.address && (
          <div className={`error-wrapper ${validationErrors.address ? "show" : ""}`}>
            <div className="input-error">{validationErrors.address}</div>
          </div>
        )}

        <button type="submit" className="submit-button">
          Зареєструватися
        </button>
        <span
          className="form-switcher"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Увійти
        </span>
        <div className={`error-wrapper ${error ? "show" : ""}`}>
          {error && <div className="error-network">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
