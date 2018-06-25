import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * @module DefaultController
 *
 * @description Default Controller included with a new fabrix app
 * @see {@link http://fabrix.app/doc/api/controllers}
 */
export class DefaultController extends Controller {

  /**
   * Return some info about this application
   */
  info (request, reply) {
    reply(this.app.services.DefaultService.getApplicationInfo())
  }
}
