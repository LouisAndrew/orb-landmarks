require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  plugins: ["prefer-arrow-functions"],
  extends: ["@louisandrew3/eslint-config/base.js"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "prefer-arrow-functions/prefer-arrow-functions": "off",
  },
};
