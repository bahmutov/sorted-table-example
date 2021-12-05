/// <reference types="cypress" />

const { _ } = Cypress
chai.use(require('chai-sorted'))

beforeEach(() => {
  cy.visit('app/table.html')
})

it('is not sorted at first', () => {
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .then(($cells) => _.map($cells, 'innerText'))
    .then((strings) => _.map(strings, (s) => new Date(s)))
    .then((dates) => _.map(dates, (d) => d.getTime()))
    .should('not.be.sorted') // shortened version
})

it('gets sorted by date', () => {
  cy.contains('button', 'Sort by date').click()

  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .and(($cells) => { // with the should callback, things will retry
      const strings = _.map($cells, 'innerText')
      const dates = _.map(strings, (s) => new Date(s))
      const timestamps = _.map(dates, (d) => d.getTime())

      expect(timestamps).to.be.ascending
    })
})

it.skip('gets sorted by date - fails without hard wait', () => {
  cy.contains('button', 'Sort by date').click().wait(3000) // fails without it
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .then(($cells) => _.map($cells, 'innerText'))
    .then((strings) => _.map(strings, (s) => new Date(s)))
    .then((dates) => _.map(dates, (d) => d.getTime()))
    .should('be.ascending')
})
