import { useEffect, useRef, useState } from 'react';
import './App.css';
import Editor, { BackgroundComponentBackgroundType, Color4, Erase } from 'js-draw';
import { MaterialIconProvider } from '@js-draw/material-icons';
import 'js-draw/bundledStyles';
import ImageUploader from './ImageUploader'; // Import the ImageUploader component


function App() {
  const user = 'User';
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showImageUploader, setShowImageUploader] = useState(false); // State to toggle ImageUploader


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
          const pngUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = pngUrl;
          a.download = 'signature.png';
          a.click();
          URL.revokeObjectURL(pngUrl);
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
        <button onClick={saveCanvas}>Save</button>
        <button onClick={showUploader}>Upload Image</button>
        {showImageUploader && <ImageUploader />}
      </div>
      
      
    </>
  );
}

export default App;
