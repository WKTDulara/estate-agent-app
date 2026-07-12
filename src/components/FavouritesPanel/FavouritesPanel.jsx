import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Link } from "react-router-dom";
import { useFavourites } from "../../context/FavouritesContext";
import { assetPath } from "../../utils/assetPath";
import "./FavouritesPanel.css";

// A favourite list item that can be dragged back out of the panel to remove it.
function DraggableFavouriteItem({ property, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `fav-${property.id}`,
    data: { property, fromFavourites: true },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : "auto",
      }
    : undefined;

  return (
    <li className="favourite-item" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img src={assetPath(property.pictures[0])} alt={property.location} draggable={false} />
      <div className="favourite-item-info">
        <Link to={`/properties/${property.id}`}>
          £{property.price.toLocaleString("en-GB")}
        </Link>
        <span>{property.bedrooms} bed {property.type}</span>
      </div>
      <button
        className="remove-btn"
        aria-label={`Remove ${property.id} from favourites`}
        onClick={() => onRemove(property.id)}
      >
        &times;
      </button>
    </li>
  );
}

export default function FavouritesPanel() {
  const { favourites, removeFavourite, clearFavourites } = useFavourites();
  const { setNodeRef, isOver } = useDroppable({ id: "favourites-drop-zone" });


  return (
    <aside
      className={`favourites-panel ${isOver ? "drop-active" : ""}`}
      ref={setNodeRef}
      aria-label="Favourite properties"
    >
      <div className="favourites-header">
        <h2>My Favourites ({favourites.length})</h2>
        {favourites.length > 0 && (
          <button className="clear-btn" onClick={clearFavourites}>
            Clear all
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <p className="favourites-empty">
          Drag a property here, or tap the heart icon on a listing, to save it.
        </p>
      ) : (
        <ul className="favourites-list">
          {favourites.map((property) => (
            <DraggableFavouriteItem
              key={property.id}
              property={property}
              onRemove={removeFavourite}
            />
          ))}
        </ul>
      )}
    </aside>
  );
}
