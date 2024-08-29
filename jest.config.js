module.exports = {
    transform: {
      "^.+\\.jsx?$": "vite-jest"
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  };
  