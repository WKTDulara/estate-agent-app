import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import { FavouritesProvider } from "./context/FavouritesContext";
import "./App.css";

export default function App() {
  return (
    <FavouritesProvider>
      <div className="app-shell">
        <header className="app-header">
          <Link to="/" className="app-logo">Jula Estates</Link>
          <p className="app-tagline">Find your next home</p>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/properties/:id" element={<PropertyPage />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Jula Estates — coursework project, 5COSC026W.</p>
        </footer>
      </div>
    </FavouritesProvider>
  );
}
