import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from "./reducer";

import App from './App';

import "./styles.css";

const store = createStore(reducer);

const ProvidedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ProvidedApp />, rootElement);
