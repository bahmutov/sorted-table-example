const { _ } = Cypress
function square(n) {
  return n * n;
}

it('array.map(fn) vs _.map(array, fn)', () => {
  // array.map(fn) 
  cy.wrap(
    [4, 8].map(square)
  ).should('deep.eq', [16, 64])
  
  // _.map(array, fn)
  cy.wrap(
    _.map([4, 8], square)
  ).should('deep.eq', [16, 64])
})

it('object comparison: lodash maps over values automatically', () => {
  // not mapping over objects for array.map, so get the values
  cy.wrap(
    Object.values({ 'a': 4, 'b': 8 }).map(square)
  ).should('deep.eq', [16, 64])
  
  // one advantage of lodash map is being able t map over objects
  cy.wrap(
    _.map({ 'a': 4, 'b': 8 }, square)
  ).should('deep.eq', [16, 64])  
})

it('KEY: the `_.property` iteratee shorthand is useful, esp when working with jQuery', () => {
  const arr = [
    { user: 'barney' },
    { user: 'fred' }
  ];

  cy.wrap(
    arr.map(i => i.user)
  ).should('deep.eq', ['barney', 'fred'])
   
  cy.wrap(
    _.map(arr, 'user')
  ).should('deep.eq', ['barney', 'fred'])
})
