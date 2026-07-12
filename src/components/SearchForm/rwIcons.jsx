/**
 * react-widgets 5.8.6 assigns its default icons (spinner carets, calendar
 * icon) via the legacy `Component.defaultProps = {...}` pattern on function
 * components. React 19 dropped support for that pattern entirely — it's
 * simply ignored — so any icon that only relied on the library's default
 * silently renders as nothing, even though the button itself still renders.
 *
 * Fix: pass the icons in explicitly as props instead of relying on the
 * library's defaults. These SVGs are the same paths react-widgets uses
 * internally, so visually nothing changes — this just makes the icon an
 * explicit prop instead of an implicit default that React 19 ignores.
 */
export function CaretUpIcon() {
  return (
    <svg height="1em" fill="currentColor" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M288.66 352H31.34c-17.82 0-26.74-21.54-14.14-34.14L145.86 189.2a20 20 0 0 1 28.28 0L302.8 317.86c12.6 12.6 3.68 34.14-14.14 34.14z" />
    </svg>
  );
}

export function CaretDownIcon() {
  return (
    <svg height="1em" fill="currentColor" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg height="1em" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" />
    </svg>
  );
}
