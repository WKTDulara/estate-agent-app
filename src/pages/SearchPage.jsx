import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import SearchForm from "../components/SearchForm/SearchForm";
import ResultsList from "../components/ResultsList/ResultsList";
import FavouritesPanel from "../components/FavouritesPanel/FavouritesPanel";
import { useDroppable } from "@dnd-kit/core";
import { useFavourites } from "../context/FavouritesContext";
import { searchProperties } from "../utils/searchProperties";
import data from "../data/properties.json";
import "./SearchPage.css";

export default function SearchPage() {
  const [results, setResults] = useState(data.properties);
  const { addFavourite, removeFavourite } = useFavourites();
  // The main results area doubles as a "drag out to remove" zone for favourites.
  const { setNodeRef: setMainDropRef, isOver: isOverMain } = useDroppable({
    id: "results-drop-zone",
  });

  function handleSearch(criteria) {
    setResults(searchProperties(data.properties, criteria));
  }

  // Handles both directions of drag-and-drop:
  // - dragging a result card onto the favourites panel adds it (duplicate-safe)
  // - dragging a favourite item back onto the main results area removes it
  function handleDragEnd(event) {
    const { over, active } = event;
    const dragData = active.data.current;

    if (over && over.id === "favourites-drop-zone" && dragData?.property) {
      addFavourite(dragData.property);
    }

    if (over && over.id === "results-drop-zone" && dragData?.fromFavourites) {
      removeFavourite(dragData.property.id);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="search-page">
        <div className="search-page-sidebar">
          <SearchForm onSearch={handleSearch} />
          <FavouritesPanel />
        </div>
        <div
          className={`search-page-main ${isOverMain ? "drop-active" : ""}`}
          ref={setMainDropRef}
        >
          <p className="results-count">{results.length} properties found</p>
          <ResultsList properties={results} />
        </div>
      </div>
    </DndContext>
  );
}
