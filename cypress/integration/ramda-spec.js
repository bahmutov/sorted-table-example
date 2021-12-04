/// <reference types="cypress" />

// a few tests that show how to use Ramda library with Cypress tests
import * as R from 'ramda'

chai.use(require('chai-sorted'))
const { $ } = Cypress

// allow calling "new Date" without "new" keyword
// https://glebbahmutov.com/blog/work-around-the-keyword-new-in-javascript/
const toDate = R.constructN(1, Date)

it('works with Ramda', () => {
  cy.wrap(R.range(1, 5)).should('deep.equal', [1, 2, 3, 4])
})

beforeEach(() => {
  cy.visit('app/table.html')
})

// Ramda.map calls `X.map` on whatever object it gets,
// so it will be same as invoking `jQuery.map`
// which returns again a jQuery object which is unfortunate.
// So we gotta convert that object to a plain array.

it('is not sorted at first', () => {
  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    // the first 3 are interchangeable, how do we get Ramda to work?
    // .then($cells => $.makeArray($cells).map(i => i.innerText)) // arr.map(i => i.property)
    // .then($cells => _.map($.makeArray($cells), 'innerText')) // _.map(arr, 'property')
    // .then($cells => _.map($cells, 'innerText')) // _.property` iteratee shorthand
    .then(($cells) => R.map(R.prop('innerText'), $.makeArray($cells))) // R.map(R.prop('property'), arr)
    .then((strings) => R.map(toDate, strings))
    // .then(dates => R.map(d => d.getTime(), dates)).then(console.log) // use R.invoker instead
    .then((dates) => R.map(R.invoker(0, 'getTime'), dates))
    .should('not.be.sorted')
})

it('gets sorted by date', () => {
  cy.contains('button', 'Sort by date').click()

  cy.get('tbody td:nth-child(2)')
    .should('have.length', 4)
    .and(($cells) => {
      // with the should callback, things will retry
      const strings = R.map(R.prop('innerText'), $.makeArray($cells))
      const dates = R.map(toDate, strings)
      const timestamps = R.map(R.invoker(0, 'getTime'), dates)

      // basically composition right to left
      // const timestamps = R.map(R.invoker(0, 'getTime'), R.map(toDate, R.map(R.prop('innerText'), $.makeArray($cells))))

      expect(timestamps).to.be.ascending
    })
})

it('gets sorted sorted by date, using pipe', () => {
  cy.contains('button', 'Sort by date').click()

  cy.get('tbody td:nth-child(2)').should(($cells) => {
    const fn = R.pipe(
      $.makeArray,
      R.map(R.prop('innerText')),
      R.map(toDate),
      R.map(R.invoker(0, 'getTime')),
    )
    // The function fn constructed above is sitting, waiting for data. Once the data is passed in,
    // the fn($cells) is computed and passed to the assertion expect(...).to ... for evaluation.

    expect(fn($cells)).to.be.ascending
  })
})
