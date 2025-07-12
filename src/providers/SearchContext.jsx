import { createContext, useContext, useState, useCallback } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }) {
  // const [isFilterActive, setFilterActive] = useState(false);

  const [draftFilters, setDraftFilters] = useState({
    brand: "",
    model: "",
    minPrice: 0,
    maxPrice: 0,
    minYear: "",
    maxYear: "",
  });

  // Активные фильтры (то, что применяется)
  const [filters, setFilters] = useState(null); // null = фильтр не активен

  // Список моделей по выбранному бренду
  const [modelsList, setModelsList] = useState([]);

  // Лоты и пагинация
  const [sellLots, setSellLots] = useState([]);
  const [lotsCount, setLotsCount] = useState(0);
  const [curPage, setCurPage] = useState(1);

  // Применение фильтров
  const applyFilters = useCallback(() => {
    setFilters({ ...draftFilters });
    setCurPage(1);
  }, [draftFilters]);

  const resetFilters = useCallback(() => {
    setDraftFilters({
      brand: "",
      model: "",
      minYear: "",
      maxYear: "",
      minPrice: 0,
      maxPrice: 0,
    });
    setFilters(null);
    setCurPage(1);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        draftFilters,
        setDraftFilters,
        filters,
        isFilterActive: filters !== null,
        applyFilters,
        resetFilters,
        modelsList,
        setModelsList,
        sellLots,
        setSellLots,
        lotsCount,
        setLotsCount,
        curPage,
        setCurPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
