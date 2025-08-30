// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    setupNodeEvents(on, config) {
      // тут можна додавати плагіни
    },
  },
});
