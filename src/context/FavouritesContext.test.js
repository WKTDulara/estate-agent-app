import { render, screen, fireEvent } from "@testing-library/react";
import { FavouritesProvider, useFavourites } from "./FavouritesContext";

// A tiny harness component so we can exercise the context's public API.
function Harness() {
  const { favourites, addFavourite, removeFavourite, clearFavourites } = useFavourites();
  const sample = { id: "prop1", type: "House", price: 750000 };
  const sample2 = { id: "prop2", type: "Flat", price: 399995 };

  return (
    <div>
      <p data-testid="count">{favourites.length}</p>
      <button onClick={() => addFavourite(sample)}>add-prop1</button>
      <button onClick={() => addFavourite(sample2)}>add-prop2</button>
      <button onClick={() => removeFavourite("prop1")}>remove-prop1</button>
      <button onClick={() => clearFavourites()}>clear</button>
    </div>
  );
}

function renderHarness() {
  return render(
    <FavouritesProvider>
      <Harness />
    </FavouritesProvider>
  );
}

describe("FavouritesContext", () => {
  test("starts empty", () => {
    renderHarness();
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  test("adding the same property twice does not create a duplicate", () => {
    renderHarness();
    fireEvent.click(screen.getByText("add-prop1"));
    fireEvent.click(screen.getByText("add-prop1"));
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  test("removing a favourite decreases the count", () => {
    renderHarness();
    fireEvent.click(screen.getByText("add-prop1"));
    fireEvent.click(screen.getByText("add-prop2"));
    fireEvent.click(screen.getByText("remove-prop1"));
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  test("clearing favourites empties the list", () => {
    renderHarness();
    fireEvent.click(screen.getByText("add-prop1"));
    fireEvent.click(screen.getByText("add-prop2"));
    fireEvent.click(screen.getByText("clear"));
    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});
