import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";

const App = () => {
  return <div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </div>
  
}

export default App;
