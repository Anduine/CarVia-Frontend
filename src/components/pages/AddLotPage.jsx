import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLot from "../ui/edit-add-lot-form/FormLot";
import { createLot } from "../../services/Lots.service";

function AddLotPage() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e, formData) => {
    e.preventDefault();

    createLot(formData)
      .then((response) => {
        setError(response?.data || "Лот створено");
        setLoading(true);
      })
      .catch((err) => {
        setError(err);
        console.error("Помилка при відправленні форми", err);
        setLoading(false);
      })
      .finally(() => {
        console.log("Форма відправлена:", formData);
        setTimeout(() => navigate(`/profile`), 2000);
      });
  };

  if (loading) return <div className="information-block">Лот створено</div>;

  return (
    <div className="add-lot-page">
      <h1>Додати новий лот</h1>
      <FormLot handleSubmit={handleSubmit} error={error} />
    </div>
  );
}

export default AddLotPage;
