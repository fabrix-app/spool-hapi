'use strict'

const assert = require('assert')
const FabrixApp = require('@fabrix/fabrix').FabrixApp
const RouterSpool = require('@fabrix/spool-router').RouterSpool
const HapiSpool = require('../../dist/HapiSpool').HapiSpool


describe('TapestryController', () => {
  let app
  before(() => {
    app = new FabrixApp({
      config: {
        main: {
          spools: [
            RouterSpool,
            HapiSpool
          ]
        },
        web: {
          port: 3001,
          host: '0.0.0.0',
          options: {
            routes: {
              cors: true
            }
          }
        },
      },
      api: {},
      pkg: {}
    })

    return app.start()
  })

  describe('#spool.serverConfig', () => {
    it('should have route cors set to true', () => {
      console.log(app.spools.hapi.serverConfig)
      assert(app.spools['hapi'])
      assert.equal(app.spools.hapi.serverConfig.routes.cors, true)
    })
  })

  after(() => {
    app.stop()
  })
})