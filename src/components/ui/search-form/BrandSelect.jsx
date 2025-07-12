import { useEffect, useState } from "react";
import { useSearch } from "../../../providers/SearchContext";
import { getBrands, getModels } from "../../../services/Lots.service";

function BrandSelect({ name }) {
  const { draftFilters, setDraftFilters, setModelsList } = useSearch();

  // const [selectedBrandID, setSelectedBrand] = useState("");
  const [carBrands, setCarBrands] = useState([]);

  useEffect(() => {
    getBrands()
      .then((response) => setCarBrands(response.data))
      .catch((error) => console.error("Помилка отримання брендів:", error.message));
  }, []);

  useEffect(() => {
    if (draftFilters.brand !== "") {
      getModels(draftFilters.brand)
        .then((response) => setModelsList(response.data))
        .catch((error) => console.error("Помилка отримання моделей:", error.message));
    }
  }, [draftFilters.brand, setModelsList]);

  const handleChange = (event) => {
    const selectedBrandName = event.target.value;

    setDraftFilters((prev) => ({ ...prev, brand: selectedBrandName, model: "" }));
  };

  return (
    <select name={name} value={draftFilters.brand} onChange={handleChange}>
      <option value="">Бренд</option>
      {carBrands &&
        carBrands.map((brand) => (
          <option key={brand.brand_id} value={brand.brand_name}>
            {brand.brand_name}
          </option>
        ))}
    </select>
  );
}

export default BrandSelect;
