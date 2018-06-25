'use strict'

const assert = require('assert')

describe('Spool', () => {
  let spool
  before(() => {
    spool = global.app.spools['hapi']
  })
  it('should be loaded into the app.spools collection', () => {
    assert(spool)
  })
})
