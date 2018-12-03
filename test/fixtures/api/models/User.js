'use strict'
const Model = require('@fabrix/fabrix/dist/common/Model').FabrixModel
const SequelizeResolver = require('@fabrix/spool-sequelize').SequelizeResolver

/**
 * User
 *
 * @description A User model
 */
module.exports = class User extends Model {
  static config(app, Sequelize) {
    return {
      //More informations about supported models options here : http://docs.sequelizejs.com/en/latest/docs/models-definition/#configuration
      options: {

      }
    }
  }

  static schema(app, Sequelize) {
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  //If you need associations, put them here
  static associate (models) {
    //More information about associations here : http://docs.sequelizejs.com/en/latest/docs/associations/
    models.User.hasMany(models.Role, {
      as: 'roles',
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    })
  }
}
