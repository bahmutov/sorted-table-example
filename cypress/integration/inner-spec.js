/// <reference types="cypress" />

import { invoke, map, toDate, pipe, really } from 'cypress-should-really'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

beforeEach(() => {
  cy.visit('app/table.html')
})

function findPropertyDescriptor(obj, propName) {
  if (!obj) {
    return
  }
  return (
    Object.getOwnPropertyDescriptor(obj, propName) ||
    findPropertyDescriptor(Object.getPrototypeOf(obj), propName)
  )
}

it('spies on innerHTML property', () => {
  // wait for the initial table to be there
  cy.get('tbody tr').should('have.length', 4)
  cy.get('tbody').then(($tbody) => {
    // prepare a stub that will be called when the application
    // calls table.innerHTML = ... with sorted html
    const setTable = cy.stub().as('setTable')

    // use our own "el.innerHTML" to call the spy AND call the original "innerHTML"
    const el = $tbody[0]
    const ownProperty = findPropertyDescriptor(el, 'innerHTML')
    expect(ownProperty, 'innerHTML descriptor').to.not.be.undefined

    Object.defineProperty(el, 'innerHTML', {
      get() {
        return ownProperty.get.call(el)
      },
      set(newHtml) {
        setTable()
        ownProperty.set.call(el, newHtml)
      },
    })
  })

  cy.contains('button', 'Sort by date').click()
  // once our spy is called, that means the application
  // has called "tbody.innerHTML = ..." and the table is sorted
  cy.get('@setTable').should('be.called')

  // check if the table is sorted
  const fn = pipe(map('innerText'), map(toDate), invoke('getTime'))
  cy.get('tbody td:nth-child(2)').then(fn).should('be.sorted')
})
