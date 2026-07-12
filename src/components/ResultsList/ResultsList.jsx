import PropertyCard from "../PropertyCard/PropertyCard";
import "./ResultsList.css";

export default function ResultsList({ properties }) {
  if (properties.length === 0) {
    return <p className="no-results">No properties match your search criteria.</p>;
  }

  return (
    <div className="results-list" data-testid="results-list">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
