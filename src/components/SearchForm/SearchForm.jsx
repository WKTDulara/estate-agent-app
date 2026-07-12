import { useState } from "react";
import { Combobox, DateTimePicker, NumberPicker } from "react-widgets";
import "react-widgets/styles.css";
import { CaretUpIcon, CaretDownIcon, CalendarIcon } from "./rwIcons";
import "./SearchForm.css";

const TYPE_OPTIONS = ["Any", "House", "Flat"];
const DATE_MODES = ["No date filter", "Added after", "Added between"];

/**
 * SearchForm renders the property search criteria form.
 * Every field uses an enhanced React Widgets component rather than a bare input.
 * onSearch is called with a criteria object whenever the user submits the form.
 */
export default function SearchForm({ onSearch }) {
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minBedrooms, setMinBedrooms] = useState(null);
  const [maxBedrooms, setMaxBedrooms] = useState(null);
  const [dateMode, setDateMode] = useState("No date filter");
  const [dateAfter, setDateAfter] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [postcode, setPostcode] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({
      type,
      minPrice: minPrice ?? "",
      maxPrice: maxPrice ?? "",
      minBedrooms: minBedrooms ?? "",
      maxBedrooms: maxBedrooms ?? "",
      dateAfter: dateMode === "Added after" ? dateAfter : null,
      dateFrom: dateMode === "Added between" ? dateFrom : null,
      dateTo: dateMode === "Added between" ? dateTo : null,
      // Postcode is plain user text rendered nowhere as HTML, so no injection risk,
      // but it is still trimmed/escaped safely by React by default.
      postcode,
    });
  }

  function handleReset() {
    setType("Any");
    setMinPrice(null);
    setMaxPrice(null);
    setMinBedrooms(null);
    setMaxBedrooms(null);
    setDateMode("No date filter");
    setDateAfter(null);
    setDateFrom(null);
    setDateTo(null);
    setPostcode("");
    onSearch({});
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} aria-label="Property search form">
      <h2>Search Properties</h2>

      <div className="field">
        <label htmlFor="type-combo">Property type</label>
        <Combobox
          id="type-combo"
          data={TYPE_OPTIONS}
          value={type}
          onChange={(value) => setType(value)}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="min-price">Min price (£)</label>
          <NumberPicker
            id="min-price"
            value={minPrice}
            onChange={setMinPrice}
            min={0}
            step={5000}
            format="#,###"
            incrementIcon={<CaretUpIcon />}
            decrementIcon={<CaretDownIcon />}
          />
        </div>
        <div className="field">
          <label htmlFor="max-price">Max price (£)</label>
          <NumberPicker
            id="max-price"
            value={maxPrice}
            onChange={setMaxPrice}
            min={0}
            step={5000}
            format="#,###"
            incrementIcon={<CaretUpIcon />}
            decrementIcon={<CaretDownIcon />}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="min-bed">Min bedrooms</label>
          <NumberPicker
            id="min-bed"
            value={minBedrooms}
            onChange={setMinBedrooms}
            min={0}
            max={10}
            incrementIcon={<CaretUpIcon />}
            decrementIcon={<CaretDownIcon />}
          />
        </div>
        <div className="field">
          <label htmlFor="max-bed">Max bedrooms</label>
          <NumberPicker
            id="max-bed"
            value={maxBedrooms}
            onChange={setMaxBedrooms}
            min={0}
            max={10}
            incrementIcon={<CaretUpIcon />}
            decrementIcon={<CaretDownIcon />}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="date-mode">Date added</label>
        <Combobox
          id="date-mode"
          data={DATE_MODES}
          value={dateMode}
          onChange={(value) => setDateMode(value)}
        />
      </div>

      {dateMode === "Added after" && (
        <div className="field">
          <label htmlFor="date-after">After date</label>
          <DateTimePicker
            id="date-after"
            time={false}
            value={dateAfter}
            onChange={setDateAfter}
            selectIcon={<CalendarIcon />}
          />
        </div>
      )}

      {dateMode === "Added between" && (
        <div className="field-row">
          <div className="field">
            <label htmlFor="date-from">From date</label>
            <DateTimePicker
              id="date-from"
              time={false}
              value={dateFrom}
              onChange={setDateFrom}
              selectIcon={<CalendarIcon />}
            />
          </div>
          <div className="field">
            <label htmlFor="date-to">To date</label>
            <DateTimePicker
              id="date-to"
              time={false}
              value={dateTo}
              onChange={setDateTo}
              selectIcon={<CalendarIcon />}
            />
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="postcode-combo">Postcode area</label>
        <Combobox
          id="postcode-combo"
          data={["BR1", "BR3", "BR4", "BR5", "BR6", "BR7"]}
          value={postcode}
          onChange={(value) => setPostcode(value ?? "")}
          allowCreate="onFilter"
          placeholder="e.g. BR1"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">Search</button>
        <button type="button" className="btn-secondary" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}
