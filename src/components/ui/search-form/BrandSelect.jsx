import { useEffect, useState } from "react";
import { useSearch } from "../../../providers/SearchContext";
import { getBrands, getModels } from "../../../services/Lots.service";

function BrandSelect({ name }) {
  const { handleBrandSearch, brand, handleModelSearch, setModelsList } = useSearch();

  const [selectedBrandID, setSelectedBrand] = useState("");
  const [carBrands, setCarBrands] = useState([]);

  useEffect(() => {
    getBrands()
      .then((response) => setCarBrands(response.data))
      .catch((error) => console.error("Помилка отримання брендів:", error.message));
  }, []);

  useEffect(() => {
    if (brand !== "") {
      getModels(brand)
        .then((response) => setModelsList(response.data))
        .catch((error) => console.error("Помилка отримання моделей:", error.message));
    }
  }, [brand, setModelsList]);

  const handleChange = (event) => {
    const brandID = parseInt(event.target.value, 10);
    const selectedBrandName = carBrands.find((b) => b.brand_id === brandID)?.brand_name;

    setSelectedBrand(brandID);
    handleBrandSearch(selectedBrandName);
    handleModelSearch("");
  };

  return (
    <select name={name} value={selectedBrandID} onChange={handleChange}>
      <option value="">Марка</option>
      {carBrands &&
        carBrands.map((brand) => (
          <option key={brand.brand_id} value={brand.brand_id}>
            {brand.brand_name}
          </option>
        ))}
    </select>
  );
}

export default BrandSelect;
