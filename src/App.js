import './App.css';
// import LogoList from './components/LogoList';
import LogoForm from './components/LogoForm';
import { useState } from 'react';
import Instructions from './components/Instructions';

function App() {
  

  return (
    <div className="App">
      <div>
         <LogoForm />
      </div>
      <footer>
        <p>&copy; Author: Martin Slovík</p>
      </footer>
    </div>
  );
}

export default App;
