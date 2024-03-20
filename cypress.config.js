const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
    },
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: 'Report of Web UI Testing - Sauce Demo',
    },
  },
  e2e: {
    "env": {
      "links": {
        // "staging": "https://www.saucedemo.com/",
        "live": "https://www.saucedemo.com/"
      },
      "users": {
        "standard_user": {
          "username": "standard_user",
          "password" : "secret_sauce"
        }
      }
    },
    // baseUrl: 'https://www.saucedemo.com/',
    specPattern: "cypress/e2e",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  }
})