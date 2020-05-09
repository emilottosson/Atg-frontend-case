import React from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import { MemoryRouter } from 'react-router'

function App() {
  return (
    <MemoryRouter>
      <div className="App" >
        <Homepage />
      </div>
    </MemoryRouter>
  );
}

export default App;
