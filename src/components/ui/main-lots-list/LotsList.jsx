import { useState, useEffect } from "react";
import { useSearch } from "../../../providers/SearchContext";
import { getLotsCount, getLots, getLotsFilteredCount, getLotsFiltered } from "../../../services/Lots.service";
import SellLot from "./SellLot";
import Pagination from "./Pagination";

function LotsList() {
  const { isFilterActive, lotsCount, setLotsCount, sellLots, setSellLots, curPage, setCurPage, filters } = useSearch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPage, setMaxPage] = useState(0);
  const limitLotsOnPage = 10;

  useEffect(() => {
    setLoading(true);
    if (isFilterActive) {
      getLotsFilteredCount(
        filters.brand,
        filters.model,
        filters.minPrice,
        filters.maxPrice,
        filters.minYear,
        filters.maxYear
      )
        .then((response) => setLotsCount(response.data))
        .catch((error) => {
          console.error("Помилка отримання кількості фільтрованих лотів:", error);
          setError(error);
        });

      getLotsFiltered(
        filters.brand,
        filters.model,
        filters.minPrice,
        filters.maxPrice,
        filters.minYear,
        filters.maxYear,
        curPage,
        limitLotsOnPage
      )
        .then((response) => {
          if (Array.isArray(response.data)) {
            setSellLots(response.data);
          } else {
            setSellLots(null);
          }
        })
        .catch((error) => {
          console.error("Помилка отримання лотів:", error);
          setError(error);
        })
        .finally(() => setLoading(false));
    } else {
      getLotsCount()
        .then((response) => setLotsCount(response.data))
        .catch((error) => {
          console.error("Помилка отримання кількості лотів:", error);
          setError(error);
        });

      getLots(curPage, limitLotsOnPage)
        .then((response) => {
          setSellLots(response.data);
        })
        .catch((error) => {
          console.error("Помилка отримання лотів:", error);
          setError(error);
        })
        .finally(() => setLoading(false));
    } // eslint-disable-next-line
  }, [filters, curPage]);

  useEffect(() => {
    setMaxPage(Math.ceil(lotsCount / limitLotsOnPage));
  }, [lotsCount]);

  if (loading) return <div className="information-block">Завантаження...</div>;
  if (error) return <div className="information-block">Помилка: {error.message || error.response?.data.pre}</div>;
  if (!sellLots || sellLots.length === 0) return <div className="information-block">Лоти не знайдені</div>;

  return (
    <div className="lots-list">
      <h1>Об'яви продажу авто</h1>
      <ul>{sellLots && sellLots.map((lot) => <SellLot key={lot.lot_id} lot={lot} />)}</ul>
      <Pagination currentPage={curPage} handleSetPage={setCurPage} maxPage={maxPage} />
    </div>
  );
}

export default LotsList;
