/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('app/table.html')
})

it('spies on removeAttribute method', () => {
  cy.get('#sort-by-date')
    .then(($button) => {
      // from jQuery object we need the actual DOM element
      const button = $button[0]
      cy.spy(button, 'removeAttribute')
        .withArgs('disabled')
        .as('removeAttribute')
    })
    .click()
  cy.get('@removeAttribute').should('be.called')
})
