import { ServerSpool } from '@fabrix/fabrix/dist/common/spools/server'
import * as Hapi from 'hapi'
import { Server } from './server'
import { Validator } from './validator'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

/**
 * Hapi spool
 *
 * @class Hapi
 * @see {@link http://fabrix.app/doc/spool}
 *
 * Bind application routes to Hapi.js (from spool-router)
 */
export class HapiSpool extends ServerSpool {
  public server
  public serverConfig

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })
  }

  /**
   * Ensure that config/web is valid, and that no other competing web
   * server spools are installed (e.g. express)
   */
  async validate () {
    // return Validator.validateWebConfig(this.app.config.web)
    const requiredSpools = ['router']
    const spools = Object.keys(this.app.config.get('main.spools'))

    if (requiredSpools.some(v => spools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-hapi requires spools: ${ requiredSpools.join(', ') }!`))
    }
  }

  configure () {
    this.app.config.set('web.server', 'hapi')
    this.app.config.set('web.routes.files.relativeTo', this.app.config.get('main.paths.root'))

    this.serverConfig = {
      host: this.app.config.get('web.host'),
      port: this.app.config.get('web.port'),
      routes: this.app.config.get('web.routes')
    }
  }

  /**
   * Start Hapi Server
   */
  async initialize () {
    this.server = new Hapi.Server(this.serverConfig)
    const { server, app } = this

    await Server.registerPlugins(server, app)
    Server.registerRoutes(server, app)
    Server.registerViews(server, app)
    Server.registerExtensions(server, app)
    await this.server.start()

    this.app.emit('webserver:http:ready', this.server.listener)
  }

  async unload () {
    if (this.server) {
      this.server.stop()
    }
  }
}

