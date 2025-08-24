const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "q69n2d",
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
