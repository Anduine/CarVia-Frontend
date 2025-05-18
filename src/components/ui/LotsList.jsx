import React, { useState, useEffect } from "react";
import { useSearch } from "../../providers/SearchContext";
import { getLotsCount, getLots, getLotsFilteredCount, getLotsFiltered } from "../../services/Lots.service";
import SellLot from "./SellLot";
import Pagination from "./Pagination";

function LotsList() {
  const {
    isFilterActive,
    lotsCount,
    setLotsCount,
    sellLots,
    setSellLots,
    curPage,
    setCurPage,
    brand,
    model,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
  } = useSearch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPage, setMaxPage] = useState(0);
  const limitLotsOnPage = 10;

  useEffect(() => {
    if (isFilterActive) {
      getLotsFilteredCount(brand, model, minPrice, maxPrice, minYear, maxYear)
        .then((response) => setLotsCount(response.data))
        .catch((error) => {
          console.error("Помилка отримання кількості фільтрованих лотів:", error.message);
          setError(error);
        });
    } else {
      getLotsCount()
        .then((response) => setLotsCount(response.data))
        .catch((error) => {
          console.error("Помилка отримання кількості лотів:", error.message);
          setError(error);
        });
    }
  }, [isFilterActive, brand, model, minPrice, maxPrice, minYear, maxYear, setLotsCount]);

  useEffect(() => {
    setMaxPage(Math.ceil(lotsCount / limitLotsOnPage));
  }, [lotsCount]);

  useEffect(() => {
    setLoading(true);
    if (isFilterActive) {
      getLotsFiltered(brand, model, minPrice, maxPrice, minYear, maxYear, curPage, limitLotsOnPage)
        .then((response) => setSellLots(response.data))
        .catch((error) => {
          console.error("Помилка отримання лотів:", error.message);
          setError(error);
        })
        .finally(() => setLoading(false));
    } else {
      getLots(curPage, limitLotsOnPage)
        .then((response) => setSellLots(response.data))
        .catch((error) => {
          console.error("Помилка отримання фільтрованих лотів:", error.message);
          setError(error);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [curPage, isFilterActive, setSellLots]);

  if (loading) return <div className="information-block">Завантаження...</div>;
  if (error) return <div className="information-block">Помилка: {error}</div>;
  if (sellLots.length === 0) return <div className="information-block">Лоти не знайдені</div>;

  return (
    <div className="lots-list">
      <h1>Об'яви продажу авто</h1>
      <ul>
        {sellLots.map((lot) => (
          <SellLot key={lot.lot_id} lot={lot} />
        ))}
      </ul>
      <Pagination currentPage={curPage} handleSetPage={setCurPage} maxPage={maxPage} />
    </div>
  );
}

export default LotsList;
