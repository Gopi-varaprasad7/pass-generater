import React, { useRef, useEffect, useState, useCallback } from 'react';
import './App.css'

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const inputRef = useRef(null);

  const passGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (charAllowed) str += '!@#$%^&*-+[]{}';
    if (numberAllowed) str += '0123456789';
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passGenerater();
  }, [length, numberAllowed, charAllowed, passGenerater]);

  const copyPassword = useCallback(() => {
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, password.length);
    navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className='container'>
      <h1 className='header'>Password Generator</h1>
      <div className="input">
        <input type="text" value={password} placeholder='Password' readOnly ref={inputRef} />
        <button onClick={copyPassword}>Copy</button>
      </div>
      <div className='selection'>
        <input type="range" min={8} max={20} value={length} onChange={(e) => setLength(e.target.value)} />
        <label>Length: {length}</label>
        <input type="checkbox" checked={numberAllowed} onChange={() => setNumberAllowed(prev => !prev)} />
        <label>Numbers</label>
        <input type="checkbox" checked={charAllowed} onChange={() => setCharAllowed(prev => !prev)} />
        <label>Characters</label>
      </div>
    </div>
  );
}

export default App;
