'use strict'
require('@fabrix/fabrix')

const Boom = require('boom')
/**
 * @module Default
 * @description Test document Policy
 */
module.exports = class Standard extends Policy {
  continue(request, reply) {
    reply()//continue
  }

  fail(request, reply) {
    reply(Boom.preconditionFailed('test'))
  }
}
