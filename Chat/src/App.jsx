import "./App.css";
import Register from "./Components/Register";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <>
      <AnimatePresence>
        <div>
          <Register />
        </div>
      </AnimatePresence>
    </>
  );
}

export default App;
