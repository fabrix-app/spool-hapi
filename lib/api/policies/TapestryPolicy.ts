import * as _ from 'lodash'
import * as Boom from 'boom'

import { FabrixPolicy as Policy } from '@fabrix/fabrix/dist/common'

/**
 * Tapestry Policy
 *
 * Validate tapestry requests; namely, that the path parameters represent
 * actual and correct models and actions. Semantic ORM input validation is
 * performed by the tapestrieservice.
 *
 * @see http://hapijs.com/api#request-object
 */
export class TapestryPolicy extends Policy {

  /**
   * Create Policy.
   * @see TapestryController.create
   */
  create (request, reply) {
    this.log.debug('[TapestryPolicy] (create)')

    if (!_.isPlainObject(request.payload) && !_.isArray(request.payload)) {
      return reply(Boom.preconditionFailed(this.__('errors.tapestries.payload')))
    }

    reply()
  }

  /**
   * Find Policy.
   * @see TapestryController.find
   */
  find (request, reply) {
    const criteria = this.app.packs.hapi.getCriteriaFromQuery(request.query)

    if (request.params.id && !_.isEmpty(criteria)) {
      return reply(Boom.preconditionFailed(this.__('errors.tapestries.find.mutex')))
    }

    reply()
  }

  /**
   * Update Policy.
   * @see TapestryController.update
   */
  update (request, reply) {
    if (request.params.id && !_.isEmpty(request.query)) {
      return reply(Boom.preconditionFailed(this.__('errors.tapestries.update.mutex')))
    }

    reply()
  }

  /**
   * Destroy Policy.
   * @see TapestryController.destroy
   */
  destroy (request, reply) {
    if (request.params.id && !_.isEmpty(request.query)) {
      return reply(Boom.preconditionFailed(this.__('errors.tapestries.destroy.mutex')))
    }

    reply()
  }

  /**
   * Create Association Policy.
   * @see TapestryController.createAssociation
   */
  createAssociation (request, reply) {
    if (!_.isPlainObject(request.payload)) {
      return reply(Boom.preconditionFailed(this.__('errors.tapestries.payload')))
    }

    reply()
  }

  /**
   * Find Association Policy.
   * @see TapestryController.findAssociation
   */
  findAssociation (request, reply) {
    if (request.params.childId && !_.isEmpty(request.query)) {
      return reply(Boom.preconditionFailed(this.__('errors.tapestries.find.mutex')))
    }

    reply()
  }

  /**
   * Update Association Policy.
   * @see TapestryController.updateAssociation
   */
  updateAssociation (request, reply) {
    if (request.params.childId && !_.isEmpty(request.query)) {
      return reply(Boom.preconditionFailed(this.__('errors.tapestries.update.mutex')))
    }

    reply()
  }

  /**
   * Destroy Association Policy.
   * @see TapestryController.destroyAssociation
   */
  destroyAssociation (request, reply) {
    if (request.params.childId && !_.isEmpty(request.query)) {
      return reply(Boom.preconditionFailed(this.__('errors.tapestries.destroy.mutex')))
    }

    reply()
  }
}
