'use strict'
require('@fabrix/fabrix')
/**
   * @module DefaultService
   *
   * @description Default Service included with a new fabrix app
   * @see {@link http://fabrix.app/doc/api/services}
   * @this fabrixApp
   */
module.exports = class DefaultService extends Service {

  /**
   * Return some info about this application
   */
  getApplicationInfo() {
    return {
      app: this.app.pkg.version
    }
  }
}
