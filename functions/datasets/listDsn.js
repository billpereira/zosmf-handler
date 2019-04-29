// ------------------------------------------------------------
//
//  Author:   William Pereira
//  Date:     02/12/2019
//  Function: List DSNs based on hlq provided and volser if available
//
// ------------------------------------------------------------
// How to use:
// listDsn(options)
//     .then(results => console.log('results :', results))
//     .catch(e => console.log('e :', e));
// ------------------------------------------------------------

const makeRequest = require("../../services/https-request");

// GET /zosmf/restfiles/ds?dslevel=<dataset_name_pattern>
//     [&volser=<volser>&start=<dsname>]
const handleOptions = options =>
  new Promise((resolve, reject) => {
    options.path = `/zosmf/restfiles/ds?dslevel=${options.hlq}&volser=${
      options.volser
    }`;
    options.method = "GET";
    if (!options.hostname || !options.auth || !options.hlq) {
      const error = { error: "parms missing" };
      reject(error);
    }
    if (!options.headers) options.headers = { "X-CSRF-ZOSMF-HEADER": "ZOSMF" };
    if (!options.volser) {
      options.path = `/zosmf/restfiles/ds?dslevel=${options.hlq}`;
    }
    resolve(options);
  });
const listDsn = async options => {
  const optionsLD = await handleOptions(options).catch(e => e);
  try {
    return await makeRequest(optionsLD).catch(e => e);
  } catch (error) {
    return error;
  }
};

module.exports = listDsn;
