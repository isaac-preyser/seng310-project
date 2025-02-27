import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
interface TextRecognitionProps {
  selectedImage: string;
}

const TextRecognition: React.FC<TextRecognitionProps> = ({ selectedImage }) => {
  const [recognizedText, setRecognizedText] = useState('');
  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        const result = await Tesseract.recognize(selectedImage);
        setRecognizedText(result.data.text);
      }
    };
    recognizeText();
  }, [selectedImage]);
  return (
    <div>
      <h2>Recognized Text:</h2>
      <p>{recognizedText}</p>
    </div>
  );
};
export default TextRecognition;