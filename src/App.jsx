import FaceIDError from "./pages/FaceIDError"
import FaceID from "./pages/FaceID"
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Questions from "./pages/Questions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/faceID" element={<FaceID/>}/>
        <Route path="/faceIDError" element={<FaceIDError/>}/>
        <Route path="/quest" element={<Questions/>}/>
      </Routes>
    </Router>
  )
}

export default App
