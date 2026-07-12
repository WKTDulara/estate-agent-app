import { searchProperties } from "./searchProperties";
import data from "../data/properties.json";

const properties = data.properties;

describe("searchProperties", () => {
  test("returns all properties when no criteria are supplied", () => {
    const result = searchProperties(properties, {});
    expect(result).toHaveLength(properties.length);
  });

  test("filters by a single criterion (type)", () => {
    const result = searchProperties(properties, { type: "Flat" });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.type).toBe("Flat"));
  });

  test("filters by multiple simultaneous criteria (type + bedrooms + price)", () => {
    const result = searchProperties(properties, {
      type: "House",
      minBedrooms: 4,
      maxPrice: 1000000,
    });
    result.forEach((p) => {
      expect(p.type).toBe("House");
      expect(p.bedrooms).toBeGreaterThanOrEqual(4);
      expect(p.price).toBeLessThanOrEqual(1000000);
    });
  });

  test("filters by postcode area (first part only)", () => {
    const result = searchProperties(properties, { postcode: "BR6" });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.postcode).toBe("BR6"));
  });

  test("filters by date added after a given date", () => {
    const result = searchProperties(properties, { dateAfter: "2024-01-01" });
    result.forEach((p) => {
      const added = new Date(`${p.added.month} ${p.added.day}, ${p.added.year}`);
      expect(added.getTime()).toBeGreaterThan(new Date("2024-01-01").getTime());
    });
  });

  test("filters by date added between two dates", () => {
    const result = searchProperties(properties, {
      dateFrom: "2023-01-01",
      dateTo: "2023-12-31",
    });
    result.forEach((p) => {
      const added = new Date(`${p.added.month} ${p.added.day}, ${p.added.year}`);
      expect(added.getTime()).toBeGreaterThanOrEqual(new Date("2023-01-01").getTime());
      expect(added.getTime()).toBeLessThanOrEqual(new Date("2023-12-31").getTime());
    });
  });

  test("returns an empty array when no property matches", () => {
    const result = searchProperties(properties, { minPrice: 999999999 });
    expect(result).toEqual([]);
  });
});
