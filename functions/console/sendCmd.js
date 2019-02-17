// ------------------------------------------------------------
//
//  Author:   William Pereira
//  Date:     02/12/2019
//  Function: Send a command to console and return the response
//            This uses PUT and needs to pass the command trhough
//            body : {"cms":"d a,l"}
//
// ------------------------------------------------------------
// How to use:
// sendCmd(options)
//     .then(results => console.log('results :', results))
//     .catch(e => console.log('e :', e));
// ------------------------------------------------------------

const makeRequest = require('../../services/https-request');
// var options = require('../../config/options');

const handleOptions = (options) => {
  return new Promise(function(resolve, reject) {
    // PUT /zosmf/restconsoles/consoles/ibmusecn
    // {"cms":"d a,l"}
    options.path = `/zosmf/restconsoles/consoles/ibmusecn`;
    options.method = 'PUT';
    console.log('options.hostname :', options.hostname);
    console.log('options.auth :', options.auth);
    console.log('options.hostname :', options.hostname);
    if (!options.hostname || !options.auth || !options.body) {
      const error = {error: 'parms missing'};
      reject(error);
    }
    if (!options.headers) {
      options.headers = {
        'X-CSRF-ZOSMF-HEADER': 'ZOSMF',
        'Content-Type': 'application/json;charset=ISO-8859-1',
      };
    }
    resolve(options);
  });
};

const sendCmd = async (options) => {
  options = await handleOptions(options).catch((e) => e);
  if (options.error) return options;
  return await makeRequest(options).catch((e) => e);
};

module.exports = sendCmd;
