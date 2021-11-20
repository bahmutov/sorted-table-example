/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('app/table.html')
})

it('is not sorted at first', () => {
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .then(($cells) => Cypress._.map($cells, 'innerText'))
    // .then(($cells) => $cells.text())
    .then((strings) => Cypress._.map(strings, (s) => new Date(s)))
    .then((dates) => Cypress._.map(dates, (d) => d.getTime()))
    .then((timestamps) => {
      // check if the numbers are sorted by comparing to the sorted array
      const sorted = Cypress._.sortBy(timestamps)
      expect(timestamps).to.not.deep.equal(sorted)
    })
})
