import { useParams, Link } from "react-router-dom";
import Gallery from "../components/Gallery/Gallery";
import PropertyTabs from "../components/PropertyTabs/PropertyTabs";
import { useFavourites } from "../context/FavouritesContext";
import data from "../data/properties.json";
import "./PropertyPage.css";

export default function PropertyPage() {
  const { id } = useParams();
  const property = data.properties.find((p) => p.id === id);
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  if (!property) {
    return (
      <div className="property-page-not-found">
        <p>Sorry, that property could not be found.</p>
        <Link to="/">Back to search</Link>
      </div>
    );
  }

  const favourited = isFavourite(property.id);

  return (
    <div className="property-page">
      <Link to="/" className="back-link">&larr; Back to search results</Link>

      <div className="property-page-header">
        <div>
          <h1>{property.location}</h1>
          <p className="property-page-summary">
            {property.type} · {property.bedrooms} bedrooms · £{property.price.toLocaleString("en-GB")} · {property.tenure}
          </p>
        </div>
        <button
          className={`favourite-toggle ${favourited ? "active" : ""}`}
          onClick={() => (favourited ? removeFavourite(property.id) : addFavourite(property))}
        >
          {favourited ? "\u2665 Saved to favourites" : "\u2661 Add to favourites"}
        </button>
      </div>

      <Gallery pictures={property.pictures} altText={property.location} />
      <PropertyTabs property={property} />
    </div>
  );
}
