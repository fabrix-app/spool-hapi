import { Utils as RouterUtils } from '@fabrix/spool-router'
import { relative, join } from 'path'
import { omit } from 'lodash'

export const Server = {

  async registerPlugins (server, app) {
    if (!app.config.get('web.plugins')) {
      return
    }

    app.log.debug('spool-hapi: registering', app.config.get('web.plugins').length, 'plugins')

    await server.register(app.config.get('web.plugins'))

    if (typeof app.config.get('web.onPluginsLoaded') === 'function') {
      app.config.get('web.onPluginsLoaded').call(app)
    }
  },

  registerViews (server, app) {
    if (typeof server.views !== 'function') {
      return
    }
    if (!app.config.get('views.engines')) {
      app.log.warn('spool-hapi: web.views.engines is not set. vision plugin will not load')
      return
    }

    app.log.debug('spool-hapi: registering views')
    server.views(app.config.get('web.views'))
  },

  registerRoutes (server, app) {
    const serverRoutes = []

    app.routes.forEach((route, path)  => {
      RouterUtils.methods.forEach(m => {
        if (route[m]) {
          serverRoutes.push({
            path: path,
            method: m,
            handler: route[m].handler,
            config: omit(route[m].config, 'prefix')
          })
        }
      })
    })

    server.route(serverRoutes)

    if (app.config.get('main.paths.www')) {
      if (Array.isArray(app.config.get('main.paths.www'))) {
        app.config.get('main.paths.www').map(item => {
          const staticDir = relative(app.config.get('main.paths.root'), item.path)
          server.route({
            method: 'GET',
            path: item.humanUrl ?
              item.humanUrl.concat('/{filename*}') :
              '/'.concat(staticDir.replace(/\\/g, '/'), '/{filename*}'),
            handler: {
              file: function(request) {
                return join(staticDir, request.params.filename)
              }
            }
          })
        })
      }
      else {
        const staticDir = relative(app.config.get('main.paths.root'), app.config.get('main.paths.www'))
        server.route({
          method: 'GET',
          path: '/'.concat(staticDir.replace(/\\/g, '/'), '/{filename*}'),
          handler: {
            file: function(request) {
              return join(staticDir, request.params.filename)
            }
          }
        })
      }
    }
    else {
      app.log.debug('config.paths.www: No www directory is set, static files will not be loaded')
    }
  },

  registerExtensions (server, app) {
    app.config.get('web.extensions').forEach(ext => {
      ext.method = ext.method.bind({ app })
      server.ext(ext)
    })
  }
}
