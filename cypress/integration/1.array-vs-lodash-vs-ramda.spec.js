const { _, R } = Cypress
function square(n) {
  return n * n;
}

it('array.map(fn) vs _.map(array, fn) vs R.map(fn, array)', () => {
  // array.map(fn) 
  cy.wrap(
    [4, 8].map(square)
  ).should('deep.eq', [16, 64])
  
  // _.map(array, fn)
  cy.wrap(
    _.map([4, 8], square)
  ).should('deep.eq', [16, 64])

  cy.wrap(
    R.map(square, [4, 8])
  ).should('deep.eq', [16, 64])
})

it('object comparison: lodash maps over values automatically', () => {
  // no mapping over objects for array.map, so convert to array with Object.values
  cy.wrap(
    Object.values({ 'a': 4, 'b': 8 }).map(square)
  ).should('deep.eq', [16, 64])
  
  // one advantage of lodash map is being able to map over objects
  cy.wrap(
    _.map({ 'a': 4, 'b': 8 }, square)
  ).should('deep.eq', [16, 64]) 

  // similar to array.map situation with R.map, so convert to array with Object.values
  cy.wrap(
    R.map(square, Object.values({ 'a': 4, 'b': 8 }))
  ).should('deep.eq', [16, 64]) 
  
})

it(`KEY: the _.property iteratee shorthand is useful, esp when working with jQuery, 
R.map(R.prop(..),arr) does a similar thing`, () => {
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

  // looks meh at first with Ramda
  cy.wrap(
    R.map(i => i.user, arr)
  ).should('deep.eq', ['barney', 'fred'])
  // but you can make it better
  cy.wrap(
    R.map(R.prop('user'), arr)
  ).should('deep.eq', ['barney', 'fred'])
})
