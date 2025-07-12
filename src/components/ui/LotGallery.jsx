import { useState } from "react";
import { CiImageOff } from "react-icons/ci";
import ButtonNext from "./ButtonNext";
import ButtonPrev from "./ButtonPrev";

const LotGallery = ({ images, thumbnails = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="gallery">
        <div className="gallery-placeholder">
          <CiImageOff size="6rem" />
          <p>Немає фото</p>
        </div>
      </div>
    );
  }

  const handlePrevPhoto = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextPhoto = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const isPrevDisabled = currentImageIndex === 0;
  const isNextDisabled = currentImageIndex === images.length - 1;

  return (
    <div className="gallery">
      <div className="gallery-image">
        <img
          src={`${process.env.REACT_APP_API_URL}/lots/images/${images[currentImageIndex]}`}
          alt={`Car ${currentImageIndex + 1}`}
        />
      </div>
      <div className="gallery-controls">
        <ButtonPrev onClick={handlePrevPhoto} disabled={isPrevDisabled} />
        <ButtonNext onClick={handleNextPhoto} disabled={isNextDisabled} />
      </div>
      {thumbnails && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={`${process.env.REACT_APP_API_URL}/lots/images/${image}`}
              alt={`Car ${index}`}
              onClick={() => setCurrentImageIndex(index)}
              className={index === currentImageIndex ? "active" : ""}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LotGallery;
