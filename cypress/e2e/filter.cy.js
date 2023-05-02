/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

chai.config.truncateThreshold = 500

it('controls the network data and uses cy.table', () => {
  // stub the network call "GET /people" with the fixture "people.json"
  // https://on.cypress.io/intercept
  //
  // give the network intercept alias "people"
  // https://on.cypress.io/as
  //
  // visit the page "app/filter.html"
  // https://on.cypress.io/visit
  //
  // get the body of the table with id "people"
  // https://on.cypress.io/get
  //
  // extract the first column of names
  // using the cy.table command
  // and print them using cy.print
  //
  // Tip: it will be an array of arrays of strings
  // and you probably would flatten them using Lodash function
  // https://lodash.com/docs
  //
  // confirm the 4 names in the initial table
  //
  // confirm the application called to get people
  // https://on.cypress.io/wait
  //
  // type "Mary" into the search input field
  // https://on.cypress.io/type
  //
  // get the first column of names again
  // and confirm the two filtered values are "Mary" and "Mary-Ann"
})
