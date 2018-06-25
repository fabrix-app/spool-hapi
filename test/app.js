const smokesignals = require('smokesignals')
const Model = require('@fabrix/fabrix/dist/common').FabrixModel

const App = Object.assign(smokesignals.FailsafeConfig, {
  pkg: {
    name: 'hapi-spool-test'
  },
  api: {
    models: {
      User: class User extends Model {
        static config (app, Sequelize) {
          return {
            store: 'teststore'
          }
        }
        static schema (app, Sequelize) {
          return {
            name: {
              type: Sequelize.STRING
            }
          }
        }

        associate(models) {
          models.User.hasMany(models.Role, {
            as: 'roles',
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: true
            }
          })
        }
      },
      Role: class Role extends Model {
        static config (app, Sequelize) {
          return {
            store: 'teststore'
          }
        }
        static schema (app, Sequelize) {
          return {
            name: Sequelize.STRING
          }
        }
        associate(models) {
          models.Role.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: true
            }
          })
        }
      }
    }
  },
  config: {
    stores: {
      teststore: {
        database: 'dev',
        storage: './.tmp/dev.sqlite',
        host: '127.0.0.1',
        dialect: 'sqlite',
        migrate: 'drop'
      }
    },
    tapestries: {
      controllers: true,
      prefix: '',
      models: {
        options: {
          populate: true
        },
        actions: {
          create: true,
          find: true,
          update: true,
          destroy: true,
          createAssociation: true,
          findAssociation: true,
          updateAssociation: true,
          destroyAssociation: true
        }
      }
    },
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-i18n').I18nSpool,
        require('@fabrix/spool-tapestries').TapestriesSpool,
        require('@fabrix/spool-sequelize').SequelizeSpool,
        require('../dist/index').HapiSpool // spool-hapi
      ]
    },
    web: {
      port: 3000,
      host: '0.0.0.0'
    },
    routes: [ ],
    log: {
      logger: new smokesignals.Logger('error')
    }
  }
})

module.exports = App
