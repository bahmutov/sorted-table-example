/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

beforeEach(() => {
  cy.visit('app/table.html')
})

it('confirms the headings (plain cy)', () => {
  // can you confirm the table has the following headings?
  const headings = ['Name', 'Date (YYYY-MM-DD)', 'Age']
  cy.get('table thead td').should(($td) => {
    console.log('here')
    const texts = Cypress._.map($td, 'innerText')
    expect(texts, 'headings').to.deep.equal(headings)
  })
})

it('confirms the headings (cy.map)', () => {
  // can you confirm the table has the following headings?
  const headings = ['Name', 'Date (YYYY-MM-DD)', 'Age']
  // we could get each table head cell and map to its inner text
  cy.get('table thead td').map('innerText').should('deep.equal', headings)
})

it('confirms the headings', () => {
  // can you confirm the table has the following headings?
  const headings = ['Name', 'Date (YYYY-MM-DD)', 'Age']
  // we could get each table head cell and map to its inner text
  cy.get('table thead td').map('innerText').should('deep.equal', headings)
  // or let cy.table do it
  cy.get('table thead').table().its(0).should('deep.equal', headings)
})

it('prints the cells (cy.map)', () => {
  cy.get('table tbody td').map('innerText').then(console.log)
})

it('prints the cells (cy.table)', () => {
  cy.get('table tbody').table().then(console.table)
})

it('confirms the entire table with retries', () => {
  cy.get('table')
    .table()
    .should('deep.equal', [
      ['Name', 'Date (YYYY-MM-DD)', 'Age'],
      ['Joe', '1990-02-25', '20'],
      ['Anna', '2010-03-26', '37'],
      ['Dave', '1997-12-23', '25'],
      ['Joe', '2001-01-24', '30'],
    ])
})

it('confirms the sorted age column', () => {
  cy.get('table tbody')
    .table(2, 0, 1)
    .invoke('flatMap', Cypress._.identity)
    .print()
    .map(Number)
    .print()
    .should('not.be.sorted')
})

it('confirms the sorted age column', () => {
  // can you confirm the "Age" column is not sorted initially?
  // Tip: Use cy.table and other queries from cypress-map
  cy.get('table tbody')
    .table(2, 0, 1)
    .print()
    .invoke('flatMap', Cypress._.identity)
    .print('merged %o')
    .map(Number)
    .should('not.be.sorted')
  // click the sort button
  cy.get('#sort-by-date').click()
  // the "Age" column should be sorted in ascending order
  cy.get('table tbody')
    .table(2, 0, 1)
    .print()
    .invoke('flatMap', Cypress._.identity)
    .print('merged %o')
    .map(Number)
    .should('be.ascending')
  // Bonus: there is a lot of duplication in the above test
  // Can you simplify it?
})

it('confirms the sorted age column: refactored', () => {
  // can you confirm the "Age" column is not sorted initially?
  // Tip: Use cy.table and other queries from cypress-map

  // Bonus: there is a lot of duplication in the above test
  // Can you simplify it?
  const ages = () =>
    cy
      .get('table tbody')
      .table(2, 0, 1)
      .print()
      .invoke('flatMap', Cypress._.identity)
      .print('merged %o')
      .map(Number)

  ages().should('not.be.sorted')
  // click the sort button
  cy.get('#sort-by-date').click()
  // the "Age" column should be sorted in ascending order
  ages().should('be.ascending')
})

it('confirms the name and dates of the last two sorted rows', () => {
  // sort the table by date
  cy.get('#sort-by-date').click()
  // confirm the last two rows have
  // the following name and dates
  const values = [
    ['Joe', '2001-01-24'],
    ['Anna', '2010-03-26'],
  ]
  // cy.get('table tbody').table(0, 2, 2, 2).print().should('deep.equal', values)
  // what if we don't know the number of rows?
  // Can you rewrite the above code to slice the table correctly?
  cy.get('table tbody')
    .table()
    .invoke('slice', -2)
    .mapInvoke('slice', 0, 2)
    .print()
    .should('deep.equal', values)
})
