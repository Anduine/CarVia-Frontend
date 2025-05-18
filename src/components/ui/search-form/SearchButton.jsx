import { useSearch } from "../../../providers/SearchContext";
import { getLotsFiltered } from "../../../services/Lots.service";
import { useState } from "react";

function SearchButton({ name }) {
  const { setFilterSearch, setSellLots, setCurPage, brand, model, minPrice, maxPrice, minYear, maxYear } = useSearch();

  const [isLoading, setLoading] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    if (isLoading) return;

    setFilterSearch(true);
    setLoading(true);
    setCurPage(1);
    getLotsFiltered(brand, model, minPrice, maxPrice, minYear, maxYear, 1)
      .then((data) => setSellLots(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return <input type={"submit"} value="Пошук" name={name} onClick={handleClick} disabled={isLoading}></input>;
}

export default SearchButton;
