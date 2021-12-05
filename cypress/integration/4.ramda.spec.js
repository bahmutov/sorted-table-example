/// <reference types="cypress" />

chai.use(require('chai-sorted'))
const { _, $, R } = Cypress
import { really, invoke } from 'cypress-should-really'

// const toDate = string => new Date(string)
// const toDate = R.constructN(1, Date) // the two are equivalent

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
    .then($cells => R.map(R.prop('innerText'),$.makeArray($cells))) // R.map(R.prop('property'), arr)
    .then(strings => R.map(R.constructN(1, Date), strings))
    // .then(dates => R.map(d => d.getTime(), dates)).then(console.log) // use R.invoker instead
    .then(dates => R.map(R.invoker(0, 'getTime'), dates))
    .should('not.be.sorted')
  })

  it('gets sorted by date', () => {
    cy.contains('button', 'Sort by date').click()
  
    cy.get('tbody td:nth-child(2)')
      .should('have.length', 4)
      .and(($cells) => { // with the should callback, things will retry
        const strings = R.map(R.prop('innerText'), $.makeArray($cells))
        const dates = R.map(R.constructN(1, Date), strings)
        const timestamps = R.map(R.invoker(0, 'getTime'), dates)
        
        // basically composition right to left
        // const timestamps = R.map(R.invoker(0, 'getTime'), R.map(R.constructN(1, Date), R.map(R.prop('innerText'), $.makeArray($cells))))

        expect(timestamps).to.be.ascending
      })
  })
  
  it('gets sorted sorted by date, using pipe', () => {
    cy.contains('button', 'Sort by date').click()
  
    // you can use R.tap(console.log) to debug
    const fn = R.pipe( // jQuery
      $.makeArray, // Element[] 
      R.map(R.prop('innerText')), // string[]
      R.map(R.constructN(1, Date) ), // Date[] . An array of dates does not have getTime, each element has getTime
      R.map(R.invoker(0, 'getTime')), // number[]
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
      $.makeArray,
      R.map(R.prop('innerText')), // all these are interchangeable with shouldReally helpers
      R.map(R.constructN(1, Date) ),
      R.map(R.invoker(0, 'getTime')),
      'be.ascending'
    )
  )
})

// If you have any arguments for the assertion, place it after the chainer string.
// The same test can be written as
it('gets sorted sorted by date, using should really chainer arguments', () => {
  cy.contains('button', 'Sort by date').click()

  cy.get('tbody td:nth-child(2)').should(
    really(
      $.makeArray,
      R.map(R.prop('innerText')), // all these are interchangeable with shouldReally helpers
      R.map(R.constructN(1, Date) ),
      R.map(R.invoker(0, 'getTime')),
      'be.sorted', {
        descending: false,
      }
    )
  )
})

// reusable data transformation function
const fn = R.pipe(
  $.makeArray,
  R.map(R.prop('innerText')), 
  R.map(R.constructN(1, Date) ),
  R.map(R.invoker(0, 'getTime')),
)

it('sorts twice', () => {
  cy.contains('button', 'Sort by date').click()
  cy.get('tbody td:nth-child(2)').should(really(fn, 'be.ascending'))
  cy.contains('button', 'Reverse sort').click()
  cy.get('tbody td:nth-child(2)').should(really(fn, 'be.descending'))
})

it('uses disabled attribute', () => {
  cy.contains('button', 'Sort by date').click().should('not.be.disabled')
  cy.get('tbody td:nth-child(2)').then(really(fn, 'be.ascending'))
  cy.contains('button', 'Reverse sort').click().should('not.be.disabled')
  cy.get('tbody td:nth-child(2)').then(really(fn, 'be.descending'))
})
