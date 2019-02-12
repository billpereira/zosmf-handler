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

const makeRequest = require('../../services/https-request');
var options = require('../../config/options');

const handleOptions = options => {
	return new Promise(function(resolve, reject) {
		// GET /zosmf/restfiles/ds?dslevel=<dataset_name_pattern>[&volser=<volser>&start=<dsname>]
		options.path = `/zosmf/restfiles/ds?dslevel=${options.hlq}&volser=${
			options.volser
		}`;
		options.method = 'GET';
		if (!options.hostname || !options.auth || !options.hlq)
			reject({ error: 'parms missing' });
		if (!options.headers)
			options.headers = { 'X-CSRF-ZOSMF-HEADER': 'ZOSMF' };
		if (!options.volser)
			options.path = `/zosmf/restfiles/ds?dslevel=${options.hlq}`;
		resolve(options);
	});
};

const listDsn = async options => {
	options = await handleOptions(options).catch(e => e);
	return await makeRequest(options).catch(e => e);
};

module.exports = listDsn