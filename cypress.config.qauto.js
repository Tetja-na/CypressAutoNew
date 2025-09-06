const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    env: {
  username: "user1+qa21@test.com",
  password: "Test1234",
  basicAuthUser: "guest",
  basicAuthPass: "welcome2qauto"
    },
    setupNodeEvents(on, config) {
      return config;
    }
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true
  }
});

