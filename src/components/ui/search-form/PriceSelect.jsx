// import { useSearch } from "../../../providers/SearchContext";

function PriceSelect({ name, typeSelect, handleChange }) {
  return (
    <input className="combo-input" type="number" name={name} placeholder={typeSelect} onChange={handleChange}></input>
  );

  //return <input type="range" name={name} min={0} max={100} step={10} value={price} onChange={handleChange}></input>;
}

export default PriceSelect;
