import { useEffect, useRef, useState } from 'react';
import './App.css';
import Editor, { BackgroundComponentBackgroundType, Color4, Erase } from 'js-draw';
import { MaterialIconProvider } from '@js-draw/material-icons';
import 'js-draw/bundledStyles';




function App() {
  const user = 'User';
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);

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

  return (
    <>
      <h1>Welcome, {user}!</h1>
      <p>Enter your signature below:</p>
      <div ref={editorContainerRef} style={{ width: '100%', height: '100%' }} />
      <div id="button container">
        <button onClick={clearCanvas}>Clear</button>
        <button>Save</button>

      </div>
      
      
    </>
  );
}

export default App;
