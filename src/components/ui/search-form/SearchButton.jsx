import { useSearch } from "../../../providers/SearchContext";
import { useState } from "react";

function SearchButton({ name }) {
  const { applyFilters } = useSearch();
  const [isLoading, setLoading] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    if (isLoading) return;

    setLoading(true);

    applyFilters();

    setTimeout(() => setLoading(false), 300);
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Пошук..." : name}
    </button>
  );
}

export default SearchButton;
