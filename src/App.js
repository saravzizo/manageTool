import Landing from "./root/Landing";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
