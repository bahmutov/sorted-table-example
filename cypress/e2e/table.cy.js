/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

beforeEach(() => {
  cy.visit('app/table.html')
})

it('confirms the headings', () => {
  // can you confirm the table has the following headings?
  const headings = ['Name', 'Date (YYYY-MM-DD)', 'Age']
})

it('confirms the sorted age column', () => {
  // can you confirm the "Age" column is not sorted initially?
  // Tip: Use cy.table and other queries from cypress-map
  //
  // click the sort button
  //
  // the "Age" column should be sorted in ascending order
  //
  // Bonus: there is a lot of duplication in the above test
  // Can you simplify it?
})

it('confirms the name and dates of the last two sorted rows', () => {
  // sort the table by date
  //
  // confirm the last two rows have
  // the following name and dates
  const values = [
    ['Joe', '2001-01-24'],
    ['Anna', '2010-03-26'],
  ]
  //
  // what if we don't know the number of rows?
  // Can you rewrite the above code to slice the table correctly?
})
