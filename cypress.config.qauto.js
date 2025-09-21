const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      email: 'user1+qa21@test.com',
      password: 'Test1234',
      basicAuthUser: 'guest',
      basicAuthPass: 'welcome2qauto'
    }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: true
  }
});
