/// <reference types="cypress" />

// use functional utilities from this NPM library
// https://github.com/bahmutov/cypress-should-really
import { invoke, map, toDate, pipe, really } from 'cypress-should-really'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

beforeEach(() => {
  cy.visit('app/table.html')
})

it('is not sorted at first', () => {
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .then(map('innerText'))
    .then(map(toDate))
    .then(invoke('getTime'))
    .should('not.be.sorted')
})

it('gets sorted by date', () => {
  cy.contains('button', 'Sort by date').click()
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    // use a callback function as an assertion
    .and(($cells) => {
      const strings = map('innerText')($cells)
      const dates = map(toDate)(strings)
      const timestamps = invoke('getTime')(dates)
      expect(timestamps).to.be.ascending
    })
})

it('gets sorted by date: f(g(x))', () => {
  cy.contains('button', 'Sort by date').click()
  cy.get('tbody td:nth-child(2)').should(($cells) => {
    expect(invoke('getTime')(map(toDate)(map('innerText')($cells)))).to.be
      .ascending
  })
})

it('gets sorted by date: pipe', () => {
  cy.contains('button', 'Sort by date').click()
  cy.get('tbody td:nth-child(2)').should(($cells) => {
    // pipe: the data will first go through the "map('innerText')" step,
    // then through "map(toDate)" step, finally through the "invoke('getTime')"
    const fn = pipe(map('innerText'), map(toDate), invoke('getTime'))
    expect(fn($cells)).to.be.ascending
  })
})

it('gets sorted by date: really', () => {
  cy.contains('button', 'Sort by date').click()
  cy.get('tbody td:nth-child(2)').should(
    really(map('innerText'), map(toDate), invoke('getTime'), 'be.ascending'),
  )
})

it('gets sorted by date: chainer arguments', () => {
  cy.contains('button', 'Sort by date').click()
  cy.get('tbody td:nth-child(2)').should(
    really(map('innerText'), map(toDate), invoke('getTime'), 'be.sorted', {
      descending: false,
    }),
  )
})

it('sorts twice', () => {
  // reusable data transformation function
  const fn = pipe(map('innerText'), map(toDate), invoke('getTime'))
  cy.contains('button', 'Sort by date').click()
  cy.get('tbody td:nth-child(2)').should(really(fn, 'be.ascending'))
  cy.contains('button', 'Reverse sort').click()
  cy.get('tbody td:nth-child(2)').should(really(fn, 'be.descending'))
})

it('uses disabled attribute', () => {
  // reusable data transformation function
  const fn = pipe(map('innerText'), map(toDate), invoke('getTime'))
  cy.contains('button', 'Sort by date').click().should('not.be.disabled')
  cy.get('tbody td:nth-child(2)').then(really(fn, 'be.ascending'))
  cy.contains('button', 'Reverse sort').click().should('not.be.disabled')
  cy.get('tbody td:nth-child(2)').then(really(fn, 'be.descending'))
})
