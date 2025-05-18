import { useState } from "react";
import { CiImageOff } from "react-icons/ci";

function MiniLotCard({ lot }) {
  const [imageError, setImageError] = useState(false);
  const hasImage = lot.images && lot.images.length > 0 && !imageError;

  return (
    <div className="mini-lot-card">
      <div className="lot-title">
        {lot.car.brand} {lot.car.model}
      </div>
      <div className="lot-image-wrapper">
        {hasImage ? (
          <img src={lot.images[0]} alt="car" onError={() => setImageError(true)} />
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
