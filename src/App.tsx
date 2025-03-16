import React from 'react';
import './App.css';
import {UserDetailsProvider} from "./provider/UserDetailsProvider/UserDetailsProvider";
import {Controls} from "./ops/Controls";

function App() {
  return (
        <div className="App">
          <header className="App-header">

            <Controls/>
          </header>
        </div>
  );
}

export default App;
