import Rotas from "./rotas/Rotas.jsx";
import React from "react";
import store from "./redux/store.js";
import { Provider } from "react-redux";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Rotas/>
      </Provider>
    </div>
  );
}
