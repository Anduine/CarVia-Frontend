import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LotGallery from "../ui/LotGallery";
import { getLotById, buyLot } from "../../services/Lots.service";
import contact from "../../assets/images/contact.svg";
import ButtonLike from "../ui/ButtonLike";

const LotPage = () => {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const exchangeRate = 41.53;

  useEffect(() => {
    getLotById(lotId)
      .then((response) => {
        if (response.ok) setError("Лот не знайдено");
        setLot(response.data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [lotId]);

  const handleBuy = async () => {
    const confirmBuy = window.confirm("Підтвердити покупку цього авто?");
    if (!confirmBuy) return;

    buyLot(lotId)
      .then((response) => {
        if (response.ok) {
          alert("Покупка успішна!");
          navigate("/profile");
        }
      })
      .catch((err) => {
        setError(err);
        console.error("Помилка при покупці лота:", err);
      });
  };

  if (loading) return <div className="information-block">Завантаження...</div>;
  if (error) return <div className="information-block">Помилка: {error.response?.data || error.message || error}</div>;
  if (!lot) return <div className="information-block">Лот не знайдено</div>;

  return (
    <div className="lot-page">
      <LotGallery images={lot.images} thumbnails={true} />

      <div className="lot-info">
        <h1>
          {lot.car.brand} {lot.car.model}
        </h1>
        <div className="price">
          <p className="dollar-price">{lot.sale_price} $</p>
          <p className="uah-price">{Math.round(lot.sale_price * exchangeRate)} ₴</p>
        </div>
        <div className="info-grid">
          <p>Статус:</p> <p>{lot.sale_status}</p>
          <p>Пробіг:</p> <p>{lot.mileage} км</p>
          <p>Рік випуску:</p> <p>{lot.car.made_year}</p>
          <p>Двигун:</p> <p>{lot.car.engine_type}</p>
          <p>Коробка передач:</p> <p>{lot.car.transmission}</p>
          <p>Привід:</p> <p>{lot.car.wheel_drive}</p>
          <p>Колір:</p> <p>{lot.color}</p>
          <p>VIN:</p> <p>{lot.vin_code}</p>
          <p>Опис:</p> <p className="description">{lot.description}</p>
        </div>
        <div className="lot-bottom">
          <ButtonLike lotId={lot.lot_id} initialIsLiked={lot.is_liked} />
          {lot.sale_status !== "Продано" && (
            <div onClick={handleBuy} className="buy-button">
              <img className="contact" src={contact} alt="Зв'язатися"></img>
            </div>
          )}
          <p className="postdate">{new Date(lot.postdate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default LotPage;
