/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

beforeEach(() => {
  cy.visit('app/filter.html')
})

it('filters rows by name', () => {
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

// todo: implement the test using jQuery methods with retries
