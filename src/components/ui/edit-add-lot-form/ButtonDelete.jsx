import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteLot } from "../../../services/Lots.service";

function ButtonDelete({ setError, lot_id }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    deleteLot(lot_id)
      .then((response) => {
        if (response.status === 200) {
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.error("Помилка при видаленні лота:", err);
        setError(err);
      });
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      <FaRegTrashAlt />
      Видалити лот
    </button>
  );
}

export default ButtonDelete;
