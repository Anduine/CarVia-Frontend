import { useState } from "react";
import { CiImageOff } from "react-icons/ci";
import ButtonNext from "./ButtonNext";
import ButtonPrev from "./ButtonPrev";

const LotGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="lot__gallery__placeholder">
        <CiImageOff size="6rem" />
        <p>Немає фото</p>
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
    <div className="lot__gallery">
      <div className="gallery__image">
        <img src={images[currentImageIndex]} alt={`Car ${currentImageIndex + 1}`} />
      </div>
      <div className="gallery__controls">
        <ButtonPrev onClick={handlePrevPhoto} disabled={isPrevDisabled} />
        <ButtonNext onClick={handleNextPhoto} disabled={isNextDisabled} />
      </div>
      {/* <div className="gallery__thumbnails">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Car ${index}`} />
        ))}
      </div> */}
    </div>
  );
};

export default LotGallery;
