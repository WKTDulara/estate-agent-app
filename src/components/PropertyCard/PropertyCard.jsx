import { Link } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";
import { useFavourites } from "../../context/FavouritesContext";
import { assetPath } from "../../utils/assetPath";
import "./PropertyCard.css";

function formatPrice(price) {
  return `£${price.toLocaleString("en-GB")}`;
}

export default function PropertyCard({ property }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const favourited = isFavourite(property.id);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: property.id,
    data: { property },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: isDragging ? 50 : "auto",
        opacity: isDragging ? 0.6 : 1,
      }
    : undefined;

  function toggleFavourite(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favourited) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  }

  return (
    <article
      className="property-card"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <button
        className={`favourite-btn ${favourited ? "active" : ""}`}
        onClick={toggleFavourite}
        aria-label={favourited ? "Remove from favourites" : "Add to favourites"}
        title={favourited ? "Remove from favourites" : "Add to favourites"}
      >
        {favourited ? "\u2665" : "\u2661"}
      </button>

      <Link to={`/properties/${property.id}`} className="property-card-link">
        <img
          src={assetPath(property.pictures[0])}
          alt={`${property.type} in ${property.location}`}
          className="property-card-image"
          draggable={false}
        />
        <div className="property-card-body">
          <p className="property-card-price">{formatPrice(property.price)}</p>
          <p className="property-card-meta">
            {property.bedrooms} bed {property.type} · {property.postcode}
          </p>
          <p className="property-card-desc">
            {property.description.slice(0, 110)}
            {property.description.length > 110 ? "…" : ""}
          </p>
        </div>
      </Link>
    </article>
  );
}
