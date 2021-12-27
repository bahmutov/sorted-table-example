/// <reference types="cypress" />

// use functional utilities from this NPM library
// https://github.com/bahmutov/cypress-should-really
import {
  invoke,
  map,
  really,
  partial,
  flipTwoArguments,
  greaterThan,
  construct,
  tap,
} from 'cypress-should-really'

const { pickBy, countBy } = Cypress._
const pickLargerThanOne = partial(flipTwoArguments(pickBy), greaterThan(1))
const toDate = construct(Date)

beforeEach(() => {
  cy.visit('app/table.html')
})

it('has no duplicate date strings', () => {
  cy.get('tbody td:nth-child(2)').should(
    really(map('innerText'), countBy, pickLargerThanOne, 'be.empty'),
  )
})

it('has no duplicate timestamps', () => {
  cy.get('tbody td:nth-child(2)').should(
    really(
      map('innerText'), // string[]
      map(toDate), // Date[]
      map(invoke('getTime')), // number[]
      countBy,
      pickLargerThanOne,
      'be.empty',
    ),
  )
})

it('has no duplicate years', () => {
  cy.get('tbody td:nth-child(2)').should(
    really(
      map('innerText'), // string[]
      map(toDate), // Date[]
      map(invoke('getFullYear')), // number[]
      countBy,
      pickLargerThanOne,
      'be.empty',
    ),
  )
})

it('name "Joe" is included twice', () => {
  cy.get('tbody td:nth-child(1)').should(
    really(map('innerText'), countBy, pickLargerThanOne, 'deep.equal', {
      Joe: 2,
    }),
  )
})
