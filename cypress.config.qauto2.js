const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto2.forstudy.space",
    env: {
      username: "user2+qa21@test.com",
      password: "Test1234",
      basicAuthUser: "guest",
      basicAuthPass: "welcome2qauto"
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true,
  }
});