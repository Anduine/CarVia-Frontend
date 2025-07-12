import { useNavigate } from "react-router-dom";
import LotGallery from "../LotGallery";
import contact from "../../../assets/images/contact.svg";
import ButtonLike from "../ButtonLike";

function SellLot({ lot }) {
  const navigate = useNavigate();
  // $ ₴

  const exchangeRate = 41.53;

  function handleOpenLot() {
    navigate(`/lot/${lot.lot_id}`);
  }

  return (
    <li>
      <div className="lot">
        <LotGallery images={lot.images} />

        <div className="lot-info">
          <h2 onClick={handleOpenLot}>
            {lot.car.brand} {lot.car.model}
          </h2>
          <div className="price">
            <p className="dollar-price">{lot.sale_price} $</p>
            <p className="uah-price">{Math.round(lot.sale_price * exchangeRate)} ₴</p>
          </div>
          <div className="info-grid">
            <p>Пробіг:</p> <p>{lot.mileage} км</p>
            <p>Рік випуску:</p> <p>{lot.car.made_year}</p>
            <p>Двигун:</p> <p>{lot.car.engine_type}</p>
            <p>Коробка передач:</p> <p>{lot.car.transmission}</p>
            <p>Привід:</p> <p>{lot.car.wheel_drive}</p>
          </div>
          <div className="lot-bottom">
            <ButtonLike lotId={lot.lot_id} initialIsLiked={lot.is_liked} />
            {lot.sale_status !== "Продано" && (
              <div onClick={handleOpenLot} className="buy-button">
                <img className="contact" src={contact} alt="Зв'язатися"></img>
              </div>
            )}
            <p className="postdate">{new Date(lot.postdate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SellLot;
