import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import PropertyCard from "./PropertyCard";
import { FavouritesProvider } from "../../context/FavouritesContext";

const property = {
  id: "prop1",
  type: "House",
  bedrooms: 3,
  price: 750000,
  postcode: "BR5",
  location: "Petts Wood Road, Orpington",
  description: "A lovely three bedroom family home close to local amenities.",
  pictures: ["images/prop1/pic1.svg"],
};

function renderCard() {
  return render(
    <MemoryRouter>
      <FavouritesProvider>
        <DndContext>
          <PropertyCard property={property} />
        </DndContext>
      </FavouritesProvider>
    </MemoryRouter>
  );
}

describe("PropertyCard", () => {
  test("renders the price and key details", () => {
    renderCard();
    expect(screen.getByText("£750,000")).toBeInTheDocument();
    expect(screen.getByText(/3 bed House/)).toBeInTheDocument();
  });

  test("clicking the favourite button toggles its active state", () => {
    renderCard();
    const btn = screen.getByRole("button", { name: /add to favourites/i });
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: /remove from favourites/i })).toBeInTheDocument();
  });
});
