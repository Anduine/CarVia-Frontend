import { useNavigate } from "react-router-dom";

function AddLotButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add_lot");
  };

  return (
    <button className="add-lot-button" onClick={handleClick}>
      ➕ Додати новий лот
    </button>
  );
}

export default AddLotButton;
