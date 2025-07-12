import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/User.service";
import validateLogin from "../../utils/loginValidation";

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationErrors({});

    const errors = validateLogin({ login, email, password });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    loginUser(login, email, password)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);

        onLoginSuccess?.();
        navigate("/profile");
      })
      .catch((error) => {
        setError(error.response?.data || error.message || "Помилка авторизації");
        console.log("Ошибка в catch: ", error);
      })
      .finally(() => {});
  };

  return (
    <div className="login-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Вхід</h1>

        <input name="login" type="text" placeholder="Логін" value={login} onChange={(e) => setLogin(e.target.value)} />
        {validationErrors.login && (
          <div className={`error-wrapper ${validationErrors.login ? "show" : ""}`}>
            <div className="input-error">{validationErrors.login}</div>
          </div>
        )}

        <input name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {validationErrors.email && (
          <div className={`error-wrapper ${validationErrors.email ? "show" : ""}`}>
            <div className="input-error">{validationErrors.email}</div>
          </div>
        )}

        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {validationErrors.password && (
          <div className={`error-wrapper ${validationErrors.password ? "show" : ""}`}>
            <div className="input-error">{validationErrors.password}</div>
          </div>
        )}

        <button type="submit" className="submit-button">
          Увійти
        </button>
        <span
          className="form-switcher"
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Реєстрація
        </span>
        <div className={`error-wrapper ${error ? "show" : ""}`}>
          {error && <div className="error-network">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
