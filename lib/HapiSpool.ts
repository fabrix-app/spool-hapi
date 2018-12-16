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
    const requiredSpools = ['router']
    const spools = Object.keys(this.app.spools)
    if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-hapi requires spools: ${ requiredSpools.join(', ') }!`))
    }

    return Validator.validateWebConfig(this.app.config.get('web'))
  }

  configure () {
    this.app.config.set('web.server', 'hapi')
    this.app.config.set('web.routes.files.relativeTo', this.app.config.get('main.paths.root'))

    this.serverConfig = {
      host: this.app.config.get('web.host'),
      port: this.app.config.get('web.port'),
      routes: this.app.config.get('web.routes'),
      plugins: this.app.config.get('web.plugins'),
      router: this.app.config.get('web.router'),
      ...this.app.config.get('web.options'),
    }
  }

  /**
   * Start Hapi Server
   */
  async initialize () {
    this.server = new Hapi.Server(this.serverConfig)

    await Server.registerPlugins(this.server, this.app)
    Server.registerRoutes(this.server, this.app)
    Server.registerViews(this.server, this.app)
    Server.registerExtensions(this.server, this.app)
    await this.server.start()

    this.app.emit('webserver:http:ready', this.server.listener)
  }

  /**
   * Stop the Hapi Server
   */
  async unload () {
    if (this.server) {
      await this.server.stop()
    }
  }
}

