const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    browser: 'firefox',
    baseUrl: 'https://qauto.forstudy.space',
    setupNodeEvents(on, config) {
      // можна залишити порожнім
    },
  },
  env: {
    username: 'guest@forstudy.space',
    password: 'welcome2qauto'
  }
});
