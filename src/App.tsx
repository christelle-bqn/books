import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Books from "./components/Books";
import Authors from "./components/Authors";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="navContainer">
          <nav className="nav">
            <Link to="/books">Books</Link>
            <Link to="authors">Authors</Link>
          </nav>
        </div>
        <Routes>
          <Route index path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="*" element={<Navigate to="/books" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
