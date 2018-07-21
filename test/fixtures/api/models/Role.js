'use strict'
const SequelizeResolver = require('@fabrix/spool-sequelize').SequelizeResolver
require('@fabrix/fabrix')

/**
 * Pet
 *
 * @description A Pet model
 */
module.exports = class Role extends Model {

  static config(app, Sequelize) {
    return {
      //More information about supported models options here : http://docs.sequelizejs.com/en/latest/docs/models-definition/#configuration
      options: {

      }
    }
  }

  static schema(app, Sequelize) {
    return {
      name: {
        type: Sequelize.STRING
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  //If you need associations, put them here
  static associate(models) {
    //More information about associations here : http://docs.sequelizejs.com/en/latest/docs/associations/
    models.Role.belongsTo(models.User, {
      as: 'user',
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    })
  }
}
