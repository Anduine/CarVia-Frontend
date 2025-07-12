import { useSearch } from "../../../providers/SearchContext";
import BrandSelect from "./BrandSelect";
import ModelSelect from "./ModelSelect";
import PriceSelect from "./PriceSelect";
import SearchButton from "./SearchButton";
import YearSelect from "./YearSelect";

function SearchMenu() {
  const { setDraftFilters } = useSearch();

  return (
    <form className="search-form">
      <div className="search-form__grid">
        <div className="grid__item">
          <label>Марка</label>
          <BrandSelect name="brand" />
        </div>

        <div className="grid__item">
          <label>Ціна $</label>
          <div className="combo">
            <PriceSelect
              name="min_price"
              typeSelect="Від"
              handleChange={(e) => setDraftFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
            />
            <PriceSelect
              name="max_price"
              typeSelect="До"
              handleChange={(e) => setDraftFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid__item">
          <label>Модель</label>
          <ModelSelect name="model" />
        </div>

        <div className="grid__item">
          <label>Рік випуску</label>
          <div className="combo">
            <YearSelect
              name="min_year"
              typeSelect="Від"
              handleChange={(e) => setDraftFilters((prev) => ({ ...prev, minYear: e.target.value }))}
            />
            <YearSelect
              name="max_year"
              typeSelect="До"
              handleChange={(e) => setDraftFilters((prev) => ({ ...prev, maxYear: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid__item">
          <SearchButton name="Пошук" />
        </div>
      </div>
    </form>
  );
}

export default SearchMenu;
