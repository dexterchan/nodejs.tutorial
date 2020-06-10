const Joi = require("joi");

const schemaMarketDataRequest = Joi.object()
  .keys({
    mktdatacode: Joi.string().required(),
    fields: Joi.array().items(Joi.string()).required(),
  })
  .unknown(true);

const schemaRefDataRequest = Joi.object()
  .keys({
    requestType: Joi.string().required(),
    securities: Joi.array().items(Joi.string()).required(),
    fields: Joi.array().items(Joi.string()).required(),
  })
  .unknown(true);

module.exports = {
  validateMarketDataRequest: (mktdataRequest) =>
    Joi.validate(mktdataRequest, schemaMarketDataRequest),
  validateReferenceDataRequest: (refDataRequest) =>
    Joi.validate(refDataRequest, schemaRefDataRequest),
};
