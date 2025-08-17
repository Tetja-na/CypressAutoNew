const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "q69n2d",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
