require("@testing-library/jest-dom");

// jsdom doesn't provide TextEncoder/TextDecoder, which react-router-dom needs.
const { TextEncoder, TextDecoder } = require("util");
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
