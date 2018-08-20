/**
 * Spool Configuration
 *
 * This manifest declares the application resources which are provided and/or
 * modified by this spool.
 * @see {@link https://fabrix.app/docs/spool/config
 */
export const spool = {
  provides: {
    resources: [
      'controllers',
      'policies'
    ],
    api: {
      controllers: ['TapestryController'],
      policies: ['TapestryPolicy']
    },
    config: [
      'web',
      'locales',
      'hapi'
    ]
  },

  lifecycle: {
    initialize: {
      listen: [ 'spool:router:initialized' ],
      emit: [ 'webserver:http:ready' ]
    }
  }
}

