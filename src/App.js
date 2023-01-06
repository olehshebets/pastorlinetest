import React, { useState } from 'react';
import './App.scss';
import Button from 'react-bootstrap/Button';
import { ModalA, ModalB } from './components/Modals';

function App() {
  const [showA, setShowA] = useState();
  const [showB, setShowB] = useState();

  const switchA = () => {
    setShowA(false);
    setShowB(true);
    window.history.replaceState({}, '', '/uscontacts');
  };

  const switchB = () => {
    setShowB(false);
    setShowA(true);
    window.history.replaceState({}, '', '/allcontacts');
  };

  return (
    <div className="App">
      <Button id="buttonA" onClick={() => {
        setShowA(true)
        window.history.replaceState({}, '', '/allcontacts');
      }}>
        Button A
      </Button>

      <Button id="buttonB" onClick={() => {
        setShowB(true)
        window.history.replaceState({}, '', '/uscontacts');
      }}>Button B</Button>

      <ModalA show={showA} handleShow={(value) => setShowA(value)} switchModal={switchA} />
      <ModalB show={showB} handleShow={(value) => setShowB(value)} switchModal={switchB} />
    </div>
  );
}

export default App;
