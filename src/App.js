import Screens from "./screens";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Screens />
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default App;
