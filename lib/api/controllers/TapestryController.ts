import * as _ from 'lodash'
import * as Boom from 'boom'

import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * Tapestry Controller
 *
 * Parse the path and query params and forward them to the TapestryService.
 * The TapestryService is provided by any ORM spool, e.g.
 * spool-waterline, spool-sequelize, etc.
 *
 * @see {@link http://hapijs.com/api#request-object}
 */
export class TapestryController extends Controller {

  /**
   * @see TapestryService.create
   */
  create (request) {
    const TapestryService = this.app.services.TapestryService
    const options = this.app.spools.hapi.getOptionsFromQuery(request.query)

    this.log.debug('[TapestryController] (create) model =',
      request.params.model, ', payload =', request.payload,
      'options =', options)

    return TapestryService.create(request.params.model, request.payload, options)
  }

  /**
   * @see TapestryService.find
   */
  find (request) {
    const TapestryService = this.app.services.TapestryService
    const options = this.app.spools.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.spools.hapi.getCriteriaFromQuery(request.query)
    let response

    this.log.debug('[TapestryController] (find) model =',
      request.params.model, ', criteria =', request.query, request.params.id,
      'options =', options)

    if (request.params.id) {
      response = TapestryService.find(request.params.model, request.params.id, options)
    }
    else {
      response = TapestryService.find(request.params.model, criteria, options)
    }

    return response
      .then(result => {
        if (!result) {
          return Boom.notFound()
        }

        return result
      })
  }

  /**
   * @see TapestryService.update
   */
  update (request) {
    const TapestryService = this.app.services.TapestryService
    const options = this.app.spools.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.spools.hapi.getCriteriaFromQuery(request.query)
    const params = request.params

    this.log.debug('[TapestryController] (update) model =',
    request.params.model, ', criteria =', request.query, request.params.id,
      ', values = ', request.payload)

    if (request.params.id) {
      return TapestryService.update(params.model, params.id, request.payload, options)
    }
    else {
      return TapestryService.update(params.model, criteria, request.payload, options)
    }
  }

  /**
   * @see TapestryService.destroy
   */
  destroy (request) {
    const TapestryService = this.app.services.TapestryService
    const options = this.app.spools.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.spools.hapi.getCriteriaFromQuery(request.query)

    this.log.debug('[TapestryController] (destroy) model =',
      request.params.model, ', query =', request.query)

    if (request.params.id) {
      return TapestryService.destroy(request.params.model, request.params.id, options)
    }
    else {
      return TapestryService.destroy(request.params.model, criteria, options)
    }
  }

  /**
   * @see TapestryService.createAssociation
   */
  createAssociation (request) {
    const TapestryService = this.app.services.TapestryService
    const options = this.app.spools.hapi.getOptionsFromQuery(request.query)
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const payload = request.payload

    this.log.debug('[TapestryController] (createAssociation)',
      parentModel, '->', childAttribute, ', payload =', payload,
      'options =', options)

    return TapestryService.createAssociation(parentModel, parentId, childAttribute, payload, options)
  }

  /**
   * @see TapestryService.findAssociation
   */
  findAssociation (request) {
    const TapestryService = this.app.services.TapestryService
    const options = this.app.spools.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.spools.hapi.getCriteriaFromQuery(request.query)
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const childId = request.params.childId

    this.log.debug('[TapestryController] (findAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      ', criteria =', request.query)

    if (childId) {
      return TapestryService.findAssociation(
        parentModel, parentId, childAttribute, childId, _.extend({ findOne: true }, options)
      )
    }
    else {
      return TapestryService.findAssociation(
        parentModel, parentId, childAttribute, criteria, options
      )
    }
  }

  /**
   * @see TapestryService.updateAssociation
   */
  updateAssociation (request) {
    const TapestryService = this.app.services.TapestryService
    const options = this.app.spools.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.spools.hapi.getCriteriaFromQuery(request.query)
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const childId = request.params.childId

    this.log.debug('[TapestryController] (updateAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      ', criteria =', request.query)

    if (childId) {
      return TapestryService.updateAssociation(
        parentModel, parentId, childAttribute, childId,
        request.payload, _.extend({ findOne: true }, options)
      )
    }
    else {
      return TapestryService.updateAssociation(
        parentModel, parentId, childAttribute, criteria, request.payload
      )
    }
  }

  /**
   * @see TapestryService.destroyAssociation
   * @return the id of the destroyed record
   */
  destroyAssociation (request) {
    const TapestryService = this.app.services.TapestryService
    const options = this.app.spools.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.spools.hapi.getCriteriaFromQuery(request.query)
    const parentModel = request.params.parentModel
    const parentId = request.params.parentId
    const childAttribute = request.params.childAttribute
    const childId = request.params.childId
    let response

    this.log.debug('[TapestryController] (destroyAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      ', criteria =', request.query)

    if (childId) {
      response = TapestryService.destroyAssociation(
        parentModel, parentId, childAttribute, childId, options)
    }
    else {
      response = TapestryService.destroyAssociation(
        parentModel, parentId, childAttribute, criteria, options)
    }

    return response
      .then(result => {
        if (!result) {
          return Boom.notFound()
        }

        return result
      })
  }
}

