import { useState, useRef } from "react";
import { CiImageOff } from "react-icons/ci";

function AvatarUploader({ formData }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPreviewUrl(URL.createObjectURL(file));
    uploadFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadFile = async (file) => {
    formData.avatar = file;
  };

  return (
    <div className="avatar-uploader">
      <div className="avatar-image">
        {previewUrl ? <img src={previewUrl} alt="Preview" className="avatar-preview" /> : <CiImageOff size={48} />}
      </div>
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} style={{ display: "none" }} />
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        Перетягніть або натисніть, щоб завантажити аватар
      </div>
    </div>
  );
}

export default AvatarUploader;
