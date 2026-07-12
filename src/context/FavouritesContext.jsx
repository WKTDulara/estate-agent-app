import { createContext, useContext, useReducer } from "react";

const FavouritesContext = createContext(null);

function favouritesReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      // Duplicate prevention: ignore if the property is already favourited.
      if (state.some((p) => p.id === action.property.id)) return state;
      return [...state, action.property];
    }
    case "REMOVE":
      return state.filter((p) => p.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function FavouritesProvider({ children }) {
  const [favourites, dispatch] = useReducer(favouritesReducer, []);

  const addFavourite = (property) => dispatch({ type: "ADD", property });
  const removeFavourite = (id) => dispatch({ type: "REMOVE", id });
  const clearFavourites = () => dispatch({ type: "CLEAR" });
  const isFavourite = (id) => favourites.some((p) => p.id === id);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, clearFavourites, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
}
