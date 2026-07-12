// Converts an { month, day, year } object into a comparable Date instance.
function toDate({ month, day, year }) {
  return new Date(`${month} ${day}, ${year}`);
}

/**
 * Filters a list of properties against a set of optional search criteria.
 * Every criterion is optional — any combination of 0 to 5 criteria can be supplied
 * and only the criteria that are present (not undefined/null/empty string) are applied.
 *
 * @param {Array} properties - full list of property objects
 * @param {Object} criteria
 * @param {string} [criteria.type] - "House" | "Flat" | "Any"
 * @param {number|string} [criteria.minPrice]
 * @param {number|string} [criteria.maxPrice]
 * @param {number|string} [criteria.minBedrooms]
 * @param {number|string} [criteria.maxBedrooms]
 * @param {Date|string} [criteria.dateAfter] - return properties added after this date
 * @param {Date|string} [criteria.dateFrom] - start of a "between two dates" range
 * @param {Date|string} [criteria.dateTo] - end of a "between two dates" range
 * @param {string} [criteria.postcode] - first part of postcode, e.g. "BR1"
 * @returns {Array} filtered properties
 */
export function searchProperties(properties, criteria = {}) {
  if (!Array.isArray(properties)) return [];

  return properties.filter((property) => {
    const {
      type,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      dateAfter,
      dateFrom,
      dateTo,
      postcode,
    } = criteria;

    if (type && type !== "Any" && property.type !== type) {
      return false;
    }

    if (minPrice !== undefined && minPrice !== "" && property.price < Number(minPrice)) {
      return false;
    }

    if (maxPrice !== undefined && maxPrice !== "" && property.price > Number(maxPrice)) {
      return false;
    }

    if (
      minBedrooms !== undefined &&
      minBedrooms !== "" &&
      property.bedrooms < Number(minBedrooms)
    ) {
      return false;
    }

    if (
      maxBedrooms !== undefined &&
      maxBedrooms !== "" &&
      property.bedrooms > Number(maxBedrooms)
    ) {
      return false;
    }

    const addedDate = toDate(property.added);

    if (dateAfter) {
      const after = new Date(dateAfter);
      if (addedDate <= after) return false;
    }

    if (dateFrom) {
      const from = new Date(dateFrom);
      if (addedDate < from) return false;
    }

    if (dateTo) {
      const to = new Date(dateTo);
      if (addedDate > to) return false;
    }

    if (postcode && postcode.trim() !== "") {
      const target = postcode.trim().toUpperCase();
      if (!property.postcode.toUpperCase().startsWith(target)) return false;
    }

    return true;
  });
}
