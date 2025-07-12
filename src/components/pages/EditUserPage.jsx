import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarUploader from "../ui/profile/AvatarUploader";
import { getUserProfile, updateUserProfile } from "../../services/User.service";
import validateRegister from "../../utils/registerValidation";

function EditUserPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phonenumber: "",
    address: "",
    avatar: null,
  });

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        const user = response.data;
        setFormData({
          login: user.login || "",
          password: "",
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          phonenumber: user.phonenumber || "",
          address: user.address || "",
          avatar: user.avatar || null,
        });
      })
      .catch(() => setError("Не вдалося завантажити дані профілю"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationErrors({});

    const errors = validateRegister(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    updateUserProfile(formData)
      .then(() => {
        setLoading(true);

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch((err) => {
        setError(err);
        console.error("Помилка при оновленні профілю:", err);
      });
  };

  if (loading) return <div className="information-block">Профіль оновлено</div>;

  return (
    <div className="profile-edit-page">
      <h1>Редагування профілю</h1>
      <form className="profile-edit-from" onSubmit={handleSubmit}>
        <AvatarUploader formData={formData} />

        <div className="profile-form-grid">
          <label htmlFor="login">Логін</label>
          <div>
            <input name="login" placeholder="Логін" value={formData.login} onChange={handleChange} />
            {validationErrors.login && (
              <div className={`error-wrapper ${validationErrors.login ? "show" : ""}`}>
                <div className="input-error">{validationErrors.login}</div>
              </div>
            )}
          </div>

          <label htmlFor="password">Пароль</label>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Новий пароль"
              value={formData.password}
              onChange={handleChange}
            />
            {validationErrors.password && (
              <div className={`error-wrapper ${validationErrors.password ? "show" : ""}`}>
                <div className="input-error">{validationErrors.password}</div>
              </div>
            )}
          </div>

          <label htmlFor="email">Електронна пошта</label>
          <div>
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {validationErrors.email && (
              <div className={`error-wrapper ${validationErrors.email ? "show" : ""}`}>
                <div className="input-error">{validationErrors.email}</div>
              </div>
            )}
          </div>

          <label htmlFor="first_name">Ім’я</label>
          <div>
            <input name="first_name" placeholder="Ім’я" value={formData.first_name} onChange={handleChange} />
            {validationErrors.first_name && (
              <div className={`error-wrapper ${validationErrors.first_name ? "show" : ""}`}>
                <div className="input-error">{validationErrors.first_name}</div>
              </div>
            )}
          </div>

          <label htmlFor="last_name">Прізвище</label>
          <div>
            <input name="last_name" placeholder="Прізвище" value={formData.last_name} onChange={handleChange} />
            {validationErrors.last_name && (
              <div className={`error-wrapper ${validationErrors.last_name ? "show" : ""}`}>
                <div className="input-error">{validationErrors.last_name}</div>
              </div>
            )}
          </div>

          <label htmlFor="phonenumber">Номер телефону</label>
          <div>
            <input name="phonenumber" placeholder="Телефон" value={formData.phonenumber} onChange={handleChange} />
            {validationErrors.phonenumber && (
              <div className={`error-wrapper ${validationErrors.phonenumber ? "show" : ""}`}>
                <div className="input-error">{validationErrors.phonenumber}</div>
              </div>
            )}
          </div>

          <label htmlFor="address">Адреса</label>
          <div>
            <input name="address" placeholder="Адреса" value={formData.address} onChange={handleChange} />
            {validationErrors.address && (
              <div className={`error-wrapper ${validationErrors.address ? "show" : ""}`}>
                <div className="input-error">{validationErrors.address}</div>
              </div>
            )}
          </div>
        </div>

        <button className="submit-button" type="submit" disabled={loading}>
          Зберегти зміни
        </button>

        <div className={`error-wrapper ${error ? "show" : ""}`}>
          {error && <div className="error-network">{error.response?.data || error.message || error}</div>}
        </div>
      </form>
    </div>
  );
}

export default EditUserPage;
