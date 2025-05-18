import { useState, useRef, useEffect } from "react";

function RangeDropdown({ label, minName, maxName, onChangeMin, onChangeMax }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Закрытие по клику вне компонента
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <label className="dropdown__label" onClick={() => setOpen(!open)}>
        {label}
      </label>
      {open && (
        <div className="dropdown__panel">
          <input type="number" name={minName} placeholder="Від" onChange={(e) => onChangeMin(e.target.value)} />
          <input type="number" name={maxName} placeholder="До" onChange={(e) => onChangeMax(e.target.value)} />
        </div>
      )}
    </div>
  );
}

export default RangeDropdown;
