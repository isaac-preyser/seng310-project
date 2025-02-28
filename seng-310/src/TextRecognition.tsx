import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

interface TextRecognitionProps {
  imageFile: File;
}

const TextRecognition: React.FC<TextRecognitionProps> = ({ imageFile }) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const recognizeText = async () => {
      if (imageFile) {
        setIsLoading(true);
        const result = await Tesseract.recognize(imageFile);
        setRecognizedText(result.data.text);
        setIsLoading(false);
      }
    };
    recognizeText();
  }, [imageFile]);

  return (
    <div>
      <h2>Recognized Text:</h2>
      {isLoading ? <p>Processing...</p> : <p>{recognizedText}</p>}
    </div>
  );
};

export default TextRecognition;