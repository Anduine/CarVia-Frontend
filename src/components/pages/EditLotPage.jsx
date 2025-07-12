import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLotById, editLot } from "../../services/Lots.service";
import FormLot from "../ui/edit-add-lot-form/FormLot";
import ButtonDelete from "../ui/edit-add-lot-form/ButtonDelete";

function EditLotPage() {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lotData, setLotData] = useState(null);

  useEffect(() => {
    getLotById(lotId)
      .then((response) => {
        if (response.ok) setError("Лот не знайдено");
        setLotData(response.data);
      })
      .catch((err) => {
        console.error("Помилка в отриманні лота", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [lotId]);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    editLot(formData)
      .then((response) => {
        setError(response?.data || "Лот оновлено");
        setLoading(true);
      })
      .catch((err) => {
        setError(err);
        console.error("Помилка при відправленні форми", err);
        setLoading(false);
      })
      .finally(() => {
        console.log("Форма відправлена:", formData);
        setTimeout(() => navigate(`/lot/${lotId}`), 2000);
      });
  };

  if (loading) return <div className="information-block">Лот оновлено</div>;

  return (
    <div className="edit-lot-page">
      <h1>Редагувати лот</h1>
      <ButtonDelete lot_id={lotId} setError={setError} />
      <FormLot lotData={lotData} handleSubmit={handleSubmit} error={error} />
    </div>
  );
}

export default EditLotPage;
