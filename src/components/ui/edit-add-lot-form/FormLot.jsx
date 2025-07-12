import { useState, useEffect } from "react";
import { getBrands, getModels } from "../../../services/Lots.service";
import ImagesLoader from "./ImagesLoader";
import { validateLotForm } from "../../../utils/lotValidation";

function FormLot({ lotData, handleSubmit, error }) {
  const [brandsList, setCarBrands] = useState([]);
  const [modelsList, setModelsList] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    lot_id: null,
    seller_id: null,
    car_id: null,
    brand_id: null,
    model_id: null,
    brand: "",
    model: "",
    made_year: "",
    engine_type: "",
    transmission: "",
    wheel_drive: "",
    sale_price: 0,
    sale_status: "",
    vin_code: "",
    color: "",
    mileage: "",
    description: "",
    old_images: [],
    delete_images: [],
    new_images: [],
  });

  const adaptLotData = (lot) => ({
    lot_id: lot.lot_id,
    seller_id: lot.seller_id,
    car_id: lot.car.car_id,
    brand_id: lot.car.brand_id,
    model_id: lot.car.model_id,
    brand: lot.car.brand,
    model: lot.car.model,
    made_year: lot.car.made_year,
    engine_type: lot.car.engine_type,
    transmission: lot.car.transmission,
    wheel_drive: lot.car.wheel_drive,
    sale_price: lot.sale_price,
    sale_status: lot.sale_status,
    vin_code: lot.vin_code,
    color: lot.color,
    mileage: lot.mileage,
    description: lot.description,
    old_images: lot.images || [],
    delete_images: [],
    new_images: [],
  });

  useEffect(() => {
    if (lotData) {
      setFormData(adaptLotData(lotData));
    }

    getBrands()
      .then((response) => setCarBrands(response.data))
      .catch((error) => console.error("Помилка отримання брендів:", error.message));
  }, [lotData]);

  useEffect(() => {
    if (formData.brand !== "") {
      getModels(formData.brand)
        .then((response) => setModelsList(response.data))
        .catch((error) => console.error("Помилка отримання моделей:", error.message));
    } else {
      setModelsList([]);
    }
  }, [formData.brand]);

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors({});

    const errors = validateLotForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    handleSubmit(e, formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBrandChange = (e) => {
    const { value } = e.target;
    const brand = brandsList.find((b) => b.brand_name === value);

    setFormData((prev) => ({
      ...prev,
      brand: value,
      brand_id: brand?.brand_id || null,
      model: "",
      model_id: "",
    }));
    setModelsList([]);
  };

  const handleModelChange = (e) => {
    const { value } = e.target;
    const model = modelsList.find((m) => m.model_name === value);
    console.log(model);
    setFormData((prev) => ({
      ...prev,
      model: value,
      model_id: model?.model_id || null,
    }));
  };

  const handleWheel = (e) => {
    e.target.blur();
  };

  return (
    <form onSubmit={onSubmit} className="lot-form">
      <div className="lot-form-grid">
        <div className="form-group">
          <label>Бренд</label>
          <select name="brand" value={formData.brand} onChange={handleBrandChange}>
            <option value="">Оберіть бренд</option>
            {brandsList &&
              brandsList.map((brand) => (
                <option key={brand.brand_id} value={brand.brand_name}>
                  {brand.brand_name}
                </option>
              ))}
          </select>
          <div className={`error-wrapper ${errors.brand ? "show" : ""}`}>
            <div className="input-error">{errors.brand}</div>
          </div>
        </div>

        <div className="form-group">
          <label>Модель</label>
          <select name="model" value={formData.model} onChange={handleModelChange}>
            <option value="">Оберіть модель</option>
            {modelsList &&
              modelsList.map((model) => (
                <option key={model.model_id} value={model.model_name}>
                  {model.model_name}
                </option>
              ))}
          </select>
          <div className={`error-wrapper ${errors.model ? "show" : ""}`}>
            <div className="input-error">{errors.model}</div>
          </div>
        </div>

        <div className="form-group">
          <label>Тип приводу</label>
          <select name="wheel_drive" value={formData.wheel_drive} onChange={handleChange}>
            <option value="">Оберіть тип</option>
            <option value="Передній привід">Передній</option>
            <option value="Задній привід">Задній</option>
            <option value="Повний привід">Повний</option>
          </select>
          <div className={`error-wrapper ${errors.wheel_drive ? "show" : ""}`}>
            <div className="input-error">{errors.wheel_drive}</div>
          </div>
        </div>

        <div className="form-group">
          <label>Тип двигуна</label>
          <select name="engine_type" value={formData.engine_type} onChange={handleChange}>
            <option value="">Оберіть тип</option>
            <option value="Бензин">Бензин</option>
            <option value="Дизель">Дизель</option>
            <option value="Електро">Електро</option>
            <option value="Гібрид">Гібрид</option>
          </select>
          <div className={`error-wrapper ${errors.engine_type ? "show" : ""}`}>
            <div className="input-error">{errors.engine_type}</div>
          </div>
        </div>

        <div className="form-group">
          <label>Коробка передач</label>
          <select name="transmission" value={formData.transmission} onChange={handleChange}>
            <option value="">Оберіть тип</option>
            <option value="Механіка">Механічна</option>
            <option value="Автомат">Автомат</option>
          </select>
          <div className={`error-wrapper ${errors.transmission ? "show" : ""}`}>
            <div className="input-error">{errors.transmission}</div>
          </div>
        </div>

        <div className="form-group">
          <label>Ціна $</label>
          <input
            type="number"
            name="sale_price"
            value={formData.sale_price}
            onChange={handleChange}
            onWheel={handleWheel}
          />
          <div className={`error-wrapper ${errors.sale_price ? "show" : ""}`}>
            <div className="input-error">{errors.sale_price}</div>
          </div>
        </div>

        <div className="form-group">
          <label>Рік випуску</label>
          <input
            type="number"
            name="made_year"
            value={formData.made_year}
            onChange={handleChange}
            onWheel={handleWheel}
          />
          <div className={`error-wrapper ${errors.made_year ? "show" : ""}`}>
            <div className="input-error">{errors.made_year}</div>
          </div>
        </div>

        <div className="form-group">
          <label>Пробіг (км)</label>
          <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} onWheel={handleWheel} />
          <div className={`error-wrapper ${errors.mileage ? "show" : ""}`}>
            <div className="input-error">{errors.mileage}</div>
          </div>
        </div>

        <div className="form-group">
          <label>Колір</label>
          <input name="color" value={formData.color} onChange={handleChange} />
          <div className={`error-wrapper ${errors.color ? "show" : ""}`}>
            <div className="input-error">{errors.color}</div>
          </div>
        </div>

        <div className="form-group">
          <label>VIN код</label>
          <input name="vin_code" value={formData.vin_code} onChange={handleChange} />
          <div className={`error-wrapper ${errors.vin_code ? "show" : ""}`}>
            <div className="input-error">{errors.vin_code}</div>
          </div>
        </div>

        <div className="form-group desc-group">
          <label>Опис</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
          <div className={`error-wrapper ${errors.description ? "show" : ""}`}>
            <div className="input-error">{errors.description}</div>
          </div>
        </div>

        <ImagesLoader formData={formData} setFormData={setFormData} />
      </div>

      <button type="submit" className="submit-button">
        Підтвердити
      </button>

      <div className={`error-wrapper ${error ? "show" : ""}`}>
        {error && <div className="error-wrapper">{error.response?.data || error.message || error}</div>}
      </div>
    </form>
  );
}

export default FormLot;
