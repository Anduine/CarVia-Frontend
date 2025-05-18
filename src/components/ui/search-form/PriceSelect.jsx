function PriceSelect({ name, typeSelect, handleChange }) {
  const handleChangePrice = (event) => {
    const price = event.target.value;
    handleChange(price);
  };

  return (
    <input
      className="combo-input"
      type="number"
      name={name}
      placeholder={typeSelect}
      onChange={handleChangePrice}
    ></input>
  );

  //return <input type="range" name={name} min={0} max={100} step={10} value={price} onChange={handleChange}></input>;
}

export default PriceSelect;
