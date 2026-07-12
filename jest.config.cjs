module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|svg|gif)$": "<rootDir>/jest.fileMock.cjs",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
