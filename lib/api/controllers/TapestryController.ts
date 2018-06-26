import * as Boom from 'boom'

import { extend } from 'lodash'

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
      .then(elements => {
        return elements || {}
      })
      .catch(error => {
        if (error.code === 'E_VALIDATION') {
          return Boom.badRequest(error.code)
        }
        else if (error.code === 'E_NOT_FOUND') {
          return Boom.notFound(error.code)
        }
        else {
          return Boom.badImplementation(error.code)
        }
      })
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
          return Boom.notFound('E_NOT_FOUND')
        }
        return result
      })
      .catch(error => {
        if (error.code === 'E_VALIDATION') {
          return Boom.badRequest(error.code)
        }
        else if (error.code === 'E_NOT_FOUND') {
          return Boom.notFound(error.code)
        }
        else {
          return Boom.badImplementation(error.code)
        }
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
    let res

    this.log.debug('[TapestryController] (update) model =',
    request.params.model, ', criteria =', request.query, request.params.id,
      ', values = ', request.payload)

    if (request.params.id) {
      res = TapestryService.update(params.model, params.id, request.payload, options)
    }
    else {
      res = TapestryService.update(params.model, criteria, request.payload, options)
    }

    return res
    .catch(error => {
      if (error.code === 'E_VALIDATION') {
        return Boom.badRequest(error.code)
      }
      else if (error.code === 'E_NOT_FOUND') {
        return Boom.notFound(error.code)
      }
      else {
        return Boom.badImplementation(error.code)
      }
    })
  }

  /**
   * @see TapestryService.destroy
   */
  destroy (request) {
    const TapestryService = this.app.services.TapestryService
    const options = this.app.spools.hapi.getOptionsFromQuery(request.query)
    const criteria = this.app.spools.hapi.getCriteriaFromQuery(request.query)
    let res

    this.log.debug('[TapestryController] (destroy) model =',
      request.params.model, ', query =', request.query)

    if (request.params.id) {
      res = TapestryService.destroy(request.params.model, request.params.id, options)
        .then(result => {
          return result || {}
        })
    }
    else {
      res = TapestryService.destroy(request.params.model, criteria, options)
        .then(result => {
          return result || {}
        })
    }

    return res.catch(error => {
      if (error.code === 'E_VALIDATION') {
        return Boom.badRequest(error.code)
      }
      else if (error.code === 'E_NOT_FOUND') {
        return Boom.notFound(error.code)
      }
      else {
        return Boom.badImplementation(error.code)
      }
    })
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
      .catch(error => {
        if (error.code === 'E_VALIDATION') {
          return Boom.badRequest(error.code)
        }
        else if (error.code === 'E_NOT_FOUND') {
          return Boom.notFound(error.code)
        }
        else {
          return Boom.badImplementation(error.code)
        }
      })
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
    let res

    this.log.debug('[TapestryController] (findAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      ', criteria =', request.query)

    if (childId) {
      res = TapestryService.findAssociation(
        parentModel, parentId, childAttribute, childId, extend({ findOne: true }, options)
      )
    }
    else {
      res = TapestryService.findAssociation(
        parentModel, parentId, childAttribute, criteria, options
      )
    }

    return res.catch(error => {
      if (error.code === 'E_VALIDATION') {
        return Boom.badRequest(error.code)
      }
      else if (error.code === 'E_NOT_FOUND') {
        return Boom.notFound(error.code)
      }
      else {
        return Boom.badImplementation(error.code)
      }
    })
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
    let res

    this.log.debug('[TapestryController] (updateAssociation)',
      parentModel, parentId, '->', childAttribute, childId,
      ', criteria =', request.query)

    if (childId) {
      res = TapestryService.updateAssociation(
        parentModel, parentId, childAttribute, childId,
        request.payload, extend({ findOne: true }, options)
      )
    }
    else {
      res = TapestryService.updateAssociation(
        parentModel, parentId, childAttribute, criteria, request.payload
      )
    }

    return res.catch(error => {
      if (error.code === 'E_VALIDATION') {
        return Boom.badRequest(error.code)
      }
      else if (error.code === 'E_NOT_FOUND') {
        return Boom.notFound(error.code)
      }
      else {
        return Boom.badImplementation(error.code)
      }
    })
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
          return Boom.notFound('E_NOT_FOUND')
        }
        return result
      })
      .catch(error => {
        if (error.code === 'E_VALIDATION') {
          return Boom.badRequest(error.code)
        }
        else if (error.code === 'E_NOT_FOUND') {
          return Boom.notFound(error.code)
        }
        else {
          return Boom.badImplementation(error.code)
        }
      })
  }
}

