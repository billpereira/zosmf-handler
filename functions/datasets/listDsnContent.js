// ------------------------------------------------------------
//
//  Author:   William Pereira
//  Date:     02/15/2019
//  Function: List options.pds
//
// ------------------------------------------------------------
// How to use:
// listDsn(options)
//     .then(results => console.log('results :', results))
//     .catch(e => console.log('e :', e));
// ------------------------------------------------------------

const makeRequest = require('../../services/https-request');

const handleOptions = (options) => {
  delete options.headers;
  return new Promise((resolve, reject) => {
    // GET /zosmf/restfiles/ds/[-(<volser>)/]<dataset-name>[(<member-name>)]
    options.content = true;
    options.path = `/zosmf/restfiles/ds/${options.pds}`;
    options.method = 'GET';
    if (!options.hostname || !options.auth || !options.pds) {
      const error = { error: 'parms missing' };
      reject(error);
    }
    if (!options.headers) {
      options.headers = {
        'X-CSRF-ZOSMF-HEADER': 'ZOSMF',
        'Content-Type': 'application/json; charset=UTF-8'
      };
    }
    if (options.body) delete options.body;
    resolve(options);
  });
};

const listDsnContent = async (options) => {
  const optionsLDC = await handleOptions(options).catch(e => e);
  try {
    return await makeRequest(optionsLDC).catch(e => e);
  }
  catch (error) {
    return error;
  }
};

module.exports = listDsnContent;
