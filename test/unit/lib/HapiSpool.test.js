'use strict'
const lib = require('../../../dist/index')
const assert = require('assert')
const FabrixApp = require('@fabrix/fabrix').FabrixApp
const HapiSpool = require('../../../dist/index').HapiSpool
const RouterSpool = require('@fabrix/spool-router').RouterSpool

describe('app.spools.HapiSpool', () => {
  let app
  describe('#configure', () => {
    it('should validate that web.options is set', (done) => {
      app = new FabrixApp({
        pkg: {},
        config: {
          main: {
            spools: [
              RouterSpool
            ]
          },
          web: {
            options: {
              routes: {
                cors: true
              }
            }
          }
        },
        api: {}
      })
      const spool = new HapiSpool(app, {})
      spool.configure()
      it('should set this.serverConfig.routes.cors to true', () => {
        assert.ok(spool.serverConfig.routes.cors)
      })

      done();
    })
  });
});