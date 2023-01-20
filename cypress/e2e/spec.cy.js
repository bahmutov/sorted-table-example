/// <reference types="cypress" />

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

beforeEach(() => {
  cy.visit('app/table.html')
})

it('is not sorted at first (1)', () => {
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .then(($cells) => Cypress._.map($cells, 'innerText'))
    .then((strings) => Cypress._.map(strings, (s) => new Date(s)))
    .then((dates) => Cypress._.map(dates, (d) => d.getTime()))
    .then((timestamps) => {
      // check if the numbers are sorted by comparing to the sorted array
      const sorted = Cypress._.sortBy(timestamps)
      expect(timestamps).to.not.deep.equal(sorted)
    })
})

it('is not sorted at first (Lodash)', () => {
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .then(($cells) => Cypress._.map($cells, 'innerText'))
    .then((strings) => Cypress._.map(strings, (s) => new Date(s)))
    .then((dates) => Cypress._.map(dates, (d) => d.getTime()))
    .should('not.be.sorted')
})

it('gets sorted by date', () => {
  cy.contains('button', 'Sort by date')
    .click()
    // have to add a delay for the table to finish sorting
    .wait(3000)
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .then(($cells) => Cypress._.map($cells, 'innerText'))
    .then((strings) => Cypress._.map(strings, (s) => new Date(s)))
    .then((dates) => Cypress._.map(dates, (d) => d.getTime()))
    .should('be.ascending')
})

it('gets sorted by date', () => {
  cy.contains('button', 'Sort by date').click()
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    // use a callback function as an assertion
    .and(($cells) => {
      const strings = Cypress._.map($cells, 'innerText')
      const dates = Cypress._.map(strings, (s) => new Date(s))
      const timestamps = Cypress._.map(dates, (d) => d.getTime())
      expect(timestamps).to.be.ascending
    })
})
