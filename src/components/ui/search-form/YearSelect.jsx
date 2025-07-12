import { useState } from "react";
// import { useSearch } from "../../../providers/SearchContext";

function YearSelect({ name, typeSelect, handleChange }) {
  // const { draftFilters, setDraftFilters } = useSearch();
  const [selectedYear, setSelectedYear] = useState("");

  const years = [];
  for (let year = 2025; year >= 1980; year--) {
    years.push(year);
  }

  const handleChangeYear = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    handleChange(event);
  };

  return (
    <select className="combo__input" name={name} onChange={handleChangeYear}>
      <option value={selectedYear}> {typeSelect}</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

export default YearSelect;
