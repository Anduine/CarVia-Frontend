import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const ButtonLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <CiLogout />
      Вийти
    </button>
  );
};

export default ButtonLogout;
