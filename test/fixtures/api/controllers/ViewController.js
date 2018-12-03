'use strict'
const Controller = require('@fabrix/fabrix/dist/common/Controller').FabrixController

module.exports = class ViewController extends Controller{
  helloWorld (request, reply) {
    // res.render('index.pug', {
    //   title: 'Test',
    //   message: 'helloWorld'
    // })
  }
}
