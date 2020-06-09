const Joi = require("joi");

const schemaMarketDataRequest = Joi.object()
  .keys({
    mktdatacode: Joi.string().required,
  })
  .unknown(true);

const schemaRefDataRequest = Joi.object()
  .keys({
    securities: Joi.string().required,
    fields: Joi.string.required,
  })
  .unknown(true);
