import * as joi from 'joi'

export const webConfig = joi.object().keys({
  port: joi.number().integer().positive().required(),
  host: joi.string(),
  plugins: joi.array().optional(),
  views: joi.object().optional(),
  server: joi.string(),
  options: joi.object().optional(),
  onPluginsLoaded: joi.func().optional(),
  router: joi.object().optional(),
}).unknown()
