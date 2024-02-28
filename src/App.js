import Landing from "./root/Tree/Landing";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/tree" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
