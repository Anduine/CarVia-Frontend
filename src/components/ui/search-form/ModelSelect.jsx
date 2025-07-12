import { useSearch } from "../../../providers/SearchContext";

const ModelSelect = ({ name }) => {
  const { draftFilters, setDraftFilters, modelsList } = useSearch();

  const handleChange = (event) => {
    const selectedModelName = event.target.value;

    setDraftFilters((prev) => ({ ...prev, model: selectedModelName }));
  };

  return (
    <select name={name} value={draftFilters.model} disabled={!draftFilters.brand} onChange={handleChange}>
      <option value="">Оберіть модель</option>
      {modelsList &&
        modelsList.map((model) => (
          <option key={model.model_id} value={model.model_name}>
            {model.model_name}
          </option>
        ))}
    </select>
  );
};

export default ModelSelect;
