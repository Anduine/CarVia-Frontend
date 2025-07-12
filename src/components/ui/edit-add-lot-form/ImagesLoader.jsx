import { FaRegTrashAlt } from "react-icons/fa";

function ImagesLoader({ formData, setFormData }) {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      new_images: [...prev.new_images, ...files],
    }));
  };

  const removeImage = (type, index) => {
    setFormData((prev) => {
      if (type === "old") {
        const removed = prev.old_images[index];
        return {
          ...prev,
          old_images: prev.old_images.filter((_, i) => i !== index),
          delete_images: [...prev.delete_images, removed],
        };
      }

      if (type === "new") {
        return {
          ...prev,
          new_images: prev.new_images.filter((_, i) => i !== index),
        };
      }

      return prev;
    });
  };

  const imagesForDisplay = [
    ...formData.old_images.map((img, index) => ({
      src: `${process.env.REACT_APP_API_URL}/lots/images/${img}`,
      type: "old",
      index,
    })),
    ...formData.new_images.map((file, index) => ({ src: URL.createObjectURL(file), type: "new", index })),
  ];

  return (
    <>
      <div className="image-preview-grid img-group">
        {imagesForDisplay &&
          imagesForDisplay.map(({ src, type, index }, i) => (
            <div key={i} className="image-item">
              <img src={src} alt={`image-${i}`} />
              <button type="button" onClick={() => removeImage(type, index)}>
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
      </div>

      <div className="form-group img-group">
        <label>Завантажити фото</label>
        <input
          type="file"
          name="new_images"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
        />
      </div>
    </>
  );
}

export default ImagesLoader;
