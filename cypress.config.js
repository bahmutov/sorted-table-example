const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  viewportHeight: 300,
  viewportWidth: 400,
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
  },
})
