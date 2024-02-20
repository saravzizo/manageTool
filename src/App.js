import Landing from "./root/Landing";
import Tree from "./root/Tree/Tree";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tree" element={<Tree />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
