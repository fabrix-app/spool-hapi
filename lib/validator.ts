import * as joi from 'joi'
import { webConfig } from './schemas'

export const Validator = {
  validateWebConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, webConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.web: ' + err))
        }

        return resolve(value)
      })
    })
  }
}

