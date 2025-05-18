import { createContext, useContext, useState, useCallback } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }) {
  const [isFilterActive, setFilterActive] = useState(false);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [modelsList, setListModels] = useState([]);
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [sellLots, setLots] = useState([]);
  const [lotsCount, setCount] = useState(0);
  const [curPage, setCurrentPage] = useState(1);

  const setFilterSearch = useCallback((isActive) => {
    setFilterActive(isActive);
  }, []);

  const handleBrandSearch = useCallback((brand) => {
    setBrand(brand);
  }, []);

  const handleModelSearch = useCallback((model) => {
    setModel(model);
  }, []);

  const handleMinYearSearch = useCallback((minYear) => {
    setMinYear(minYear);
  }, []);

  const handleMaxYearSearch = useCallback((maxYear) => {
    setMaxYear(maxYear);
  }, []);

  const handleMinPriceSearch = useCallback((minPrice) => {
    setMinPrice(minPrice);
  }, []);

  const handleMaxPriceSearch = useCallback((maxPrice) => {
    setMaxPrice(maxPrice);
  }, []);

  const setModelsList = useCallback((models) => {
    setListModels(models);
  }, []);

  const setSellLots = useCallback((sellLots) => {
    setLots(sellLots);
  }, []);

  const setLotsCount = useCallback((lotsCount) => {
    setCount(lotsCount);
  }, []);

  const setCurPage = useCallback((curPage) => {
    setCurrentPage(curPage);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        setFilterSearch,
        isFilterActive,
        handleBrandSearch,
        brand,
        handleModelSearch,
        model,
        setModelsList,
        modelsList,
        handleMinYearSearch,
        minYear,
        handleMaxYearSearch,
        maxYear,
        handleMinPriceSearch,
        minPrice,
        handleMaxPriceSearch,
        maxPrice,
        setSellLots,
        sellLots,
        setLotsCount,
        lotsCount,
        setCurPage,
        curPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
