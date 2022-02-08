import { useState, useEffect } from 'react';

//arrow func with one argument callback (function passed as arg)
const keyListener = callback => {

  const [keyPressed, setKeyPressed] = useState();

  useEffect(() => {
    const onKeyDown = ({key}) => {
      if(key !== keyPressed && key.length === 1 || key !== keyPressed && key == "Backspace"){
        setKeyPressed(key);
        callback(key);
      }
    }

    const onKeyUp = () => {
      setKeyPressed(null);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };

  });

  return keyPressed;
}

export default keyListener;