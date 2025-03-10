import { useEffect, useRef, useState } from 'react';
import './App.css';
import Editor, { BackgroundComponentBackgroundType, Color4, Erase } from 'js-draw';
import { MaterialIconProvider } from '@js-draw/material-icons';
import 'js-draw/bundledStyles';
import ImageUploader from './ImageUploader'; // Import the ImageUploader component
import Tesseract from 'tesseract.js'; // Import Tesseract.js

function App() {
  const [user, setUser] = useState('User'); // State to store the username
  const [guestList, setGuestList] = useState<string[]>([]); // State to store the guest list
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showImageUploader, setShowImageUploader] = useState(false); // State to toggle ImageUploader
  const [ocrResult, setOcrResult] = useState<string | null>(null); // State to store OCR result

  useEffect(() => {
    if (editorContainerRef.current) {
      const newEditor = new Editor(editorContainerRef.current, {
        iconProvider: new MaterialIconProvider(),
      });

      newEditor.addToolbar();
      newEditor.dispatch(newEditor.setBackgroundStyle({ color: Color4.fromHex('#f0f0f0'), type: BackgroundComponentBackgroundType.None, autoresize: true}));
      setEditor(newEditor);

      // Cleanup function to properly remove the editor instance when unmounting
      return () => {
        newEditor.remove(); // Properly removes the editor from the DOM
      };
    }
  }, []); // Empty dependency array ensures this runs only once

  const clearCanvas = () => {
    if (editor) {
      const eraseAllCmd = new Erase(editor.image.getAllComponents());
      editor.dispatch(eraseAllCmd);
    }
  };

  const saveCanvas = () => {
    if (editor) {
      const svgElement = editor.toSVG();
      const data = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([data], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              // Perform OCR on the created PNG blob
              Tesseract.recognize(blob, 'eng')
                .then(({ data: { text } }) => {
                  const trimmedText = text.trim(); // Strip the newline from the OCR result
                  setOcrResult(trimmedText); // Store the OCR result in state
                  console.log('OCR Result:', trimmedText);
                  setUser(trimmedText); // Update the username with the OCR result

                  // Ask the user if they want to add their name to the guest list
                  if (window.confirm(`Hi ${trimmedText}! would you like to add your name to the guest list for networking purposes?`)) {
                    setGuestList((prevGuestList) => [...prevGuestList, trimmedText]);
                    setUser('User'); // Reset the username to 'User'
                  }
                })
                .catch((error) => {
                  console.error('OCR Error:', error);
                });
            }
          }, 'image/png');
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  const showUploader = () => {
    setShowImageUploader(true);
  };

  return (
    <>
      <h1>Welcome, {user}!</h1>
      <p>Enter your signature below:</p>
      <div ref={editorContainerRef} style={{ width: '100%', height: '100%' }} />
      <div id="button container">
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveCanvas}>Submit</button>
      </div>
      {guestList.length > 0 && (
        <div>
          <h2>Guest List:</h2>
          <ul>
            {guestList.map((guest, index) => (
              <li key={index}>{guest}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;