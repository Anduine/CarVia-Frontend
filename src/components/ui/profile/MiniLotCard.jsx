import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiImageOff } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";

function MiniLotCard({ lot, isPosted = false }) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const hasImage = lot.images && lot.images.length > 0 && !imageError;

  const handleNameClick = (e) => {
    e.stopPropagation();
    navigate(`/lot/${lot.lot_id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/edit_lot/${lot.lot_id}`);
  };

  return (
    <div className="mini-lot-card">
      {isPosted && (
        <div className="edit-button" onClick={handleEditClick}>
          <FaEdit size={20} />
        </div>
      )}

      <div className="lot-title" onClick={handleNameClick}>
        {lot.car.brand} {lot.car.model}
      </div>

      <div className="lot-image-wrapper">
        {hasImage ? (
          <img
            src={`${process.env.REACT_APP_API_URL}/lots/images/${lot.images[0]}`}
            alt="car"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="placeholder-icon">
            <CiImageOff size={48} />
          </div>
        )}
      </div>
      <div className="lot-price">{lot.sale_price} $</div>
    </div>
  );
}

export default MiniLotCard;
