import React, { useReducer, createContext } from "react";
import { reducer, initialState } from "./reducers";
import Screens from "./screens";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={1000} />
      <UserContext.Provider value={{ state, dispatch }}>
        <Screens />
      </UserContext.Provider>
    </div>
  );
}

export default App;
