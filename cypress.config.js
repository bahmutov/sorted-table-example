const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 300,
  viewportWidth: 400,
  e2e: {
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {},
    supportFile: false,
  },
})
