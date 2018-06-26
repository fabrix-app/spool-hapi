'use strict'
require('@fabrix/fabrix')
const Boom = require('boom')
/**
   * @module DefaultController
   *
   * @description Default Controller included with a new fabrix app
   * @see {@link http://fabrix.app/doc/api/controllers}
   * @this fabrixApp
   */
module.exports = class ValidationController extends Controller {
  fail(request, reply) {
    return {}
  }
  success(request, reply) {
    return {}
  }
  sendRequestData(request, reply) {
    return {
      headers: request.headers,
      query: request.query,
      params: request.params,
      body: request.body
    }
  }
}
