export const web = {
  routes: {
    files: {
    }
  },
  extensions: [
    {
      type: 'onPreResponse',
      method (request, reply) {
        const fabrixVersion = this.app['_fabrix'].version
        const nodeVersion = this.app.versions.node
        const poweredBy = `Node/${nodeVersion} fabrix/${fabrixVersion}`

        if (request.response.isBoom) {
          request.response.output.headers['X-Powered-By'] = poweredBy
        }
        else if (request.response.header) {
          request.response.header('X-Powered-By', poweredBy)
        }

        return reply.continue
      }
    }
  ]
}
