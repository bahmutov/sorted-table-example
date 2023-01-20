/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

it('confirms the headings', () => {
  cy.visit('app/table.html')
  cy.get('table thead')
    .table()
    .its(0)
    .should('deep.equal', ['Name', 'Date (YYYY-MM-DD)', 'Age'])
})

it('confirms the sorted age column', () => {
  cy.visit('app/table.html')
  cy.get('table tbody')
    .table(2, 0, 1)
    .print()
    .invoke('flatMap', Cypress._.identity)
    .print('merged %o')
    .map(Number)
    .should('not.be.sorted')
  cy.get('#sort-by-date').click()
  cy.get('table tbody')
    .table(2, 0, 1)
    .print()
    .invoke('flatMap', Cypress._.identity)
    .print('merged %o')
    .map(Number)
    .should('be.ascending')
})
