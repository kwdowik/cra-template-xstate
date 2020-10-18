import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Menu } from "./features/menu/Menu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="XState" width="100" />
        <Menu />
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
