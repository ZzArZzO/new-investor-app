const { getDefaultConfig } = require("expo/metro-config");

// Shared content + pure logic live in the web app (app/src), exposed inside
// this project as the ./shared junction (see scripts/link-shared.js). tsconfig
// paths map @/content/* and @/lib/* onto it; Metro follows them natively.
const config = getDefaultConfig(__dirname);

module.exports = config;
