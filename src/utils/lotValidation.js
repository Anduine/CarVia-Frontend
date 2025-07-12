export function validateLotForm(formData) {
  const errors = {};
  const validImageTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!formData.brand) errors.brand = "Оберіть бренд";
  if (!formData.model) errors.model = "Оберіть модель";
  if (!formData.wheel_drive) errors.wheel_drive = "Оберіть тип приводу";
  if (!formData.engine_type) errors.engine_type = "Оберіть тип двигуна";
  if (!formData.transmission) errors.transmission = "Оберіть коробку передач";

  if (!formData.sale_price || formData.sale_price <= 0) {
    errors.sale_price = "Введіть коректну ціну";
  }
  const currentYear = new Date().getFullYear();
  if (!formData.made_year || formData.made_year < 1900 || formData.made_year > currentYear) {
    errors.made_year = "Введіть коректний рік випуску";
  }
  if (!formData.mileage || formData.mileage < 0) {
    errors.mileage = "Введіть коректний пробіг";
  }
  if (!formData.vin_code.trim() || formData.vin_code.length !== 17) {
    errors.vin_code = "Введіть VIN код з 17 символів";
  }
  if (!formData.color.trim()) errors.color = "Введіть колір";
  if (!formData.description.trim()) errors.description = "Додайте опис";

  if (formData.new_images && formData.new_images.length > 10) {
    errors.image = "Максимальна кількість нових зображень - 10";
  }
  if (formData.new_images && formData.new_images.length > 0) {
    formData.new_images.forEach((file) => {
      if (!validImageTypes.includes(file.type)) {
        errors.image = `Непідтримуваний формат файлу: ${file.name}`;
      }
      if (file.size > 10 * 1024 * 1024) {
        errors.image = `Файл ${file.name} перевищує максимальний розмір 10MB`;
      }
    });
  }

  return errors;
}
