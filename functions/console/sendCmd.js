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

const handleOptions = options => new Promise((resolve, reject) => {
  // PUT /zosmf/restconsoles/consoles/ibmusecn
  // {"cms":"d a,l"}
  options.path = '/zosmf/restconsoles/consoles/ibmusecn';
  options.method = 'PUT';
  if (!options.hostname || !options.auth || !options.body) {
    const error = { error: 'parms missing' };
    reject(error);
  }
  if (!options.headers) {
    options.headers = {
      'X-CSRF-ZOSMF-HEADER': 'ZOSMF',
      'Content-Type': 'application/json;charset=ISO-8859-1'
    };
  }
  resolve(options);
});

const sendCmd = async (options) => {
  const optionsSC = await handleOptions(options).catch(e => e);
  if (optionsSC.error) return options;
  try {
    return await makeRequest(options).catch(e => e);
  }
  catch (error) {
    return error;
  }
};

module.exports = sendCmd;
