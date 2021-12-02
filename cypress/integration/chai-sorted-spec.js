/// <reference types="cypress" />

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

describe('chai-sorted', () => {
  it('sorts numbers', () => {
    expect([1, 2, 3]).to.be.sorted()
  })

  it('sorts non-unique numbers', () => {
    expect([1, 1, 2, 3, 3]).to.be.sorted()
  })

  it('handles nulls', () => {
    expect([1, 1, 2, 3, 3, null, 4]).to.not.be.sorted()
  })

  it('handles empty arrays', () => {
    expect([]).to.be.sorted()
  })

  it('handles same values', () => {
    expect([1, 1, 1]).to.be.sorted()
  })
})
