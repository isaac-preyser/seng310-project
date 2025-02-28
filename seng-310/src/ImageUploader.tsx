import React, { useState } from 'react';
import TextRecognition from './TextRecognition';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const image = files[0];
      setSelectedImage(URL.createObjectURL(image));
      setImageFile(image);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
      {imageFile && <TextRecognition imageFile={imageFile} />}
    </div>
  );
};

export default ImageUploader;