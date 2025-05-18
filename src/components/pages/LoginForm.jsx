import { useState } from "react";
import { loginUser } from "../../services/User.service";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    loginUser(login, email, password)
      .then((data) => {
        const token = data.token;
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
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Вхід</h2>
      <input type="text" placeholder="Логін" value={login} onChange={(e) => setLogin(e.target.value)} required />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Увійти</button>
      <span
        className="form-switcher"
        onClick={(e) => {
          e.preventDefault();
          navigate("/register");
        }}
      >
        Реєстрація
      </span>
      <div className={`auth-error-wrapper ${error ? "show" : ""}`}>
        {error && <div className="auth-error">{error}</div>}
      </div>
    </form>
  );
};

export default LoginForm;
