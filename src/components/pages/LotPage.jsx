import { useParams } from "react-router-dom";

function LotPage() {
  const { id } = useParams();
  // Используйте id для загрузки данных объявления
  return <div>Страница объявления {id}</div>;
}

export default LotPage;
