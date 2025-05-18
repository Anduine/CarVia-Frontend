import React, { useState } from "react";
import { useSearch } from "../../../providers/SearchContext";

const ModelSelect = ({ name }) => {
  const { handleModelSearch, modelsList, brand } = useSearch();

  const [selectedModel, setSelectedModel] = useState("");

  const handleChange = (event) => {
    const modelID = parseInt(event.target.value, 10);
    const selectedModelName = modelsList.find((m) => m.model_id === modelID)?.model_name;

    setSelectedModel(modelID);
    handleModelSearch(selectedModelName);
  };

  return (
    <select name={name} value={selectedModel} disabled={!brand} onChange={handleChange}>
      <option value="">Оберіть модель</option>
      {modelsList &&
        modelsList.map((model) => (
          <option key={model.model_id} value={model.model_id}>
            {model.model_name}
          </option>
        ))}
    </select>
  );
};

export default ModelSelect;
