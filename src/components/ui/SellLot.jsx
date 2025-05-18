import { RiPokerHeartsLine /* RiPokerHeartsFill */ } from "react-icons/ri";
import LotGallery from "./LotGallery";
import contact from "../../assets/images/contact.svg";

function SellLot({ lot }) {
  // $ ₴

  const exchangeRate = 41.53;

  let postdate;

  if (lot.postdate !== null) {
    postdate = new Date(lot.postdate).toLocaleDateString("ru-RU");
  }

  return (
    <li>
      <div className="lot">
        <LotGallery images={lot.images} />

        <div className="lot__info">
          <h1>
            {lot.car.brand} {lot.car.model}
          </h1>
          <div className="price">
            <p className="dollar-price">{lot.sale_price} $</p>
            <p className="uah-price">{Math.round(lot.sale_price * exchangeRate)} ₴</p>
          </div>
          <div className="lot__info__grid">
            <p>Статус:</p> <p>{lot.sale_status}</p>
            <p>Пробіг:</p> <p>{lot.mileage} км</p>
            <p>Рік випуску:</p> <p>{lot.car.made_year}</p>
            <p>Двигун:</p> <p>{lot.car.engine_type}</p>
            <p>Коробка передач:</p> <p>{lot.car.transmission}</p>
            <p>Привід:</p> <p>{lot.car.wheel_drive}</p>
            <p>Колір:</p> <p>{lot.color}</p>
            <p>VIN:</p> <p>{lot.vin_code}</p>
            <p>Опис:</p> <p className="description">{lot.description}</p>
            <p className="postdate">{postdate}</p>
            {/* <RiPokerHeartsFill /> */}
            <RiPokerHeartsLine className="like" />
            <img className="contact" src={contact} alt="Зв'язатися"></img>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SellLot;
