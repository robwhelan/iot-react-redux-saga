import React, { Component } from 'react';
import { Provider as ReduxProvider } from "react-redux";
import ToDO from "./pages/todo";
import configureStore from "./modules/store";
import logo from './logo.svg';
import './App.css';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ToDO />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React and stuff
            </a>
          </header>
        </div>
      </ReduxProvider>
    );
  }
}

export default App;
