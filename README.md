# spool-hapi

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

Hapi spool. This pack binds the routes compiled in [spool-router](https://github.com/fabrix-app/spool-router)
to a [Hapi Server](http://hapijs.com/api#server).

## Install
```sh
$ npm install @fabrix/spool-hapi --save
```

## Usage
Load in your spool config.

```js
// config/main.js
export const main = {
  // ...
  spools: [
    require('@fabrix/spool-router').RouterSpool,
    require('@fabix/spool-hapi').HapiSpool
  ]
}
```

### View Config
Choose a template engine.

```js
// config/views.js
export const views = {
  engine: 'handlebars'
}
```

Then simply write your views in a directory called 'templates'! This feature has been tested with Jade and Handlebars.

## Configuration
See [`config/web.js`](https://github.com/fabrix-app/fabrix-example-app/blob/master/config/web.js) for an example.

#### `port`
The port to listen on. `3000` by default. Can also be set via the `PORT` environment variable.

#### Server configuration
Configure your `Hapi.Server` by adding `options` property to the `web.js` config in typical
Hapi.server format. See: http://hapijs.com/api#new-serveroptions

```js

// config/web.js
module.exports = {
  options: {
    routes: {
      cors: true
    }
  }
}
```

#### Hapi Plugins
Register your hapi plugins by adding them to the `config/web.js` config in typical Hapi
plugin format. See: http://hapijs.com/tutorials/plugins#loading-a-plugin

```js
// config/web.js
module.exports = {
  plugins: [
    {
      plugin: require('vision'),
      options: { }
    },
    {
      plugin: require('inert'),
      options: { }
    },
    {
      plugin: require('hapi-auth-hawk'),
      options: { }
    }
    // ...
  ],

  onPluginsLoaded: function (err) {
    // Note that `this` is fabrix `app` instance
    this.spools.hapi.server.auth.strategy('default', 'hawk', { getCredentialsFunc: getCredentials });
  }
}
```

#### Hapi Views
```js
// config/web.js
module.exports = {
  views: {
    engines: {
      html: require('some-view-engine')
    },
    path: 'views'
  }
}
```

#### Static Assets
```js
// config/main.js
module.exports = {
  paths: {
    ...
    www: path.resolve(__dirname, '..', 'static')
    ...
  }
}
```
This allows static files such as js or images to be served in the /static directory.
If you prefer, feel free to use a name other than 'static'!

#### Multiple Static Assets
```js
// config/main.js
module.exports = {
  paths: {
    ...
    www: [
      {
        path: path.resolve(__dirname, '..', 'static'),
        humanUrl: '/admin'
      },
      {
        path: path.resolve(__dirname, '..', 'uploads', 'pictures', 'cats'),
        humanUrl: '/cats'
      }
    ]
    ...
  }
}
```
Also you can make multiple static assets with human url.
For example your static files in `/uploads/pictures/cats` with `humanUrl` you url look like `http://example.com/cats`
`humanUrl` - not require

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/fabrix-app/fabrix/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

## License
[MIT](https://github.com/fabrix-app/spool-hapi/blob/master/LICENSE)


[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-hapi.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-hapi
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-hapi/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-hapi/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-hapi.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-hapi
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/Lobby
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-hapi.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-hapi/coverage
