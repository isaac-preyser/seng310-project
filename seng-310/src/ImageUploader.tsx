import React, { useState } from 'react';
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const image = files[0];
      setSelectedImage(URL.createObjectURL(image));
    }
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}

      {selectedImage && (
        <div>
          <button onClick={() => window.open('TextRecognition', '_blank')}>Open TextRecognition</button>
        </div>
      )}
    </div>
  );
};
export default ImageUploader;