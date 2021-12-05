/// <reference types="cypress" />

// use functional utilities from this NPM library
// https://github.com/bahmutov/cypress-should-really
import { invoke, map, toDate, pipe, tap, really } from 'cypress-should-really'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

beforeEach(() => {
  cy.visit('app/table.html')
})

it('is not sorted at first', () => {
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .then(map('innerText'))
    .then(map((s) => new Date(s)))
    .then(map((d) => d.getTime()))
    .should('not.be.sorted')
})

it('is not sorted at first, using should-really utils', () => {
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .then(map('innerText'))
    .then(map(toDate))
    .then(invoke('getTime'))
    .should('not.be.sorted')
})

it('gets sorted sorted by date, using should-really utils', () => {
  cy.contains('button', 'Sort by date').click()

  cy.get('tbody td:nth-child(2)').should(($cells) => {
    const strings = map('innerText')($cells)
    const dates = map(toDate)(strings)
    const timestamps = invoke('getTime')(dates)

    // basically composition right to left
    // const timestamps = invoke('getTime')(map(toDate)(map('innerText')($cells)))

    expect(timestamps).to.be.ascending
  })
})

it('gets sorted sorted by date, using pipe', () => {
  cy.contains('button', 'Sort by date').click()

  const fn = pipe(
    map('innerText'), 
    map(toDate),
    // tap(console.log),
    invoke('getTime')
  )
  
  cy.get('tbody td:nth-child(2)').should(($cells) => {
    // The function fn constructed above is sitting, waiting for data. Once the data is passed in,
    // the fn($cells) is computed and passed to the assertion expect(...).to ... for evaluation.
    expect(fn($cells)).to.be.ascending
  })
})

// Piping the data through a series of functions to be fed to the assertion expect(...).to Chai chainer is so common,
// that cypress-should-really has a ... helper for this.
// If you want to transform the data and run it through a Chai assertion use really function.
// It construct a should(callback) for you:

it('gets sorted sorted by date, using should really', () => {
  cy.contains('button', 'Sort by date').click()

  cy.get('tbody td:nth-child(2)').should(
    really(
      map('innerText'), 
      map(toDate), 
      invoke('getTime'), 
      'be.ascending'),
  )
})

// If you have any arguments for the assertion, place it after the chainer string.
// The same test can be written as
it('gets sorted sorted by date, using should really chainer arguments', () => {
  cy.contains('button', 'Sort by date').click()

  cy.get('tbody td:nth-child(2)').should(
    really(
      map('innerText'), 
      map(toDate), 
      invoke('getTime'), 
      'be.sorted', {
        descending: false     
      }
    )
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
