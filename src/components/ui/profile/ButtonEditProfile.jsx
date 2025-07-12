import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function ButtonEditProfile() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit_profile");
  };

  return (
    <button onClick={handleEditProfile} className="edit-profile-button">
      <FaEdit size={32} />
    </button>
  );
}

export default ButtonEditProfile;
