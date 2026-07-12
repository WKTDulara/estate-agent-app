module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    // Jest runs under Babel/CommonJS, which doesn't understand `import.meta`.
    // This rewrites `import.meta.env.X` to `process.env.X` so the same source
    // (e.g. src/utils/assetPath.js) works under both Vite and Jest.
    "transform-vite-meta-env",
  ],
};
