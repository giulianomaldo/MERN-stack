import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";


const App = () => {
  return (
    // Agregamos className="min-h-screen" justo al lado de tu data-theme
    <div data-theme="coffee" className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
