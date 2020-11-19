import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Users } from './containers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="XState" width="200" />
        <Users />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://xstate.js.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn xstate
        </a>
      </header>
    </div>
  );
}

export default App;
