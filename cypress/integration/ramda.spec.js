/// <reference types="cypress" />

import { invoke, map, toDate, pipe, really } from 'cypress-should-really'

const { _, $, R } = Cypress
// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

beforeEach(() => {
  cy.visit('app/table.html')
})

it('works with Ramda', () => {
  cy.wrap(Cypress.R.range(1, 5)).should('deep.equal', [1, 2, 3, 4])
})

// Ramda.map calls `X.map` on whatever object it gets, 
// so it will be same as invoking `jQuery.map` 
// which returns again a jQuery object which is unfortunate. 
// So we gotta convert that object to a plain array.

it('is not sorted at first', () => {
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    // the first 3 are interchangeable, how do we get Ramda to work?
    // .then($cells => $.makeArray($cells).map(i => i.innerText)).then(console.log) // arr.map(i => i.property)
    .then($cells => _.map($.makeArray($cells), 'innerText')).then(console.log) // _.map(arr, 'property')
    // .then($cells => _.map($cells, 'innerText')).then(console.log) // _.property` iteratee shorthand
    // .then($cells => R.map($.makeArray($cells), 'innerText')).then(console.log) // how would we use Ramda instead?
})

