/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

chai.config.truncateThreshold = 500

it('filters rows by name', () => {
  cy.visit('app/filter.html')
  cy.get('#people tbody tr')
    .its('length')
    .should('be.gt', 2)
    .then((n) => {
      cy.get('input#by-name').type('Jo')
      cy.get('#people tbody tr').should('have.length.lessThan', n)
    })
  // every row's first cell should include the string "Jo"
  cy.get('#people tbody td:nth-child(1)')
    // cy.map and cy.print come from cypress-map
    .map('innerText')
    .print('names %o')
    .should((names) => {
      names.forEach((name) => {
        expect(name).to.include('Jo')
      })
    })
})

it('controls the network data', () => {
  cy.intercept('/people', { fixture: 'people.json' }).as('people')
  cy.visit('app/filter.html')
  cy.get('#people tbody tr').should('have.length', 4)
  cy.get('input#by-name').type('Mary')
  cy.get('#people tbody tr').should('have.length', 2)
})

it('controls the network data and uses cy.table', () => {
  // stub the network call "GET /people" with the fixture "people.json"
  // https://on.cypress.io/intercept
  cy.intercept('/people', { fixture: 'people.json' })
    // give the network intercept alias "people"
    // https://on.cypress.io/as
    .as('people')
  // visit the page "app/filter.html"
  // https://on.cypress.io/visit
  cy.visit('app/filter.html')
  // get the body of the table with id "people"
  // https://on.cypress.io/get
  cy.get('#people tbody')
    // extract the first column of names
    // using the cy.table command
    // and print them using cy.print
    .table(0, 0, 1)
    .print()
    // Tip: it will be an array of arrays of strings
    // and you probably would flatten them using Lodash function
    // https://lodash.com/docs
    .apply(Cypress._.flatten)
    // confirm the 4 names in the initial table
    .should('deep.equal', ['Peter', 'Pete', 'Mary', 'Mary-Ann'])
  // confirm the application called to get people
  // https://on.cypress.io/wait
  cy.wait('@people')
  // type "Mary" into the search input field
  // https://on.cypress.io/type
  cy.get('input#by-name').type('Mary')
  // get the first column of names again
  // and confirm the two filtered values are "Mary" and "Mary-Ann"
  cy.get('#people tbody')
    .table(0, 0, 1)
    .apply(Cypress._.flatten)
    .should('deep.equal', ['Mary', 'Mary-Ann'])
})

// todo: implement the test using jQuery methods with retries
