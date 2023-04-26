/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

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

// todo: implement the test using jQuery methods with retries
