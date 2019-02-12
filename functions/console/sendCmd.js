const makeRequest = require('../../services/https-request');
var options = require('../../config/options');

const handleOptions = options => {
	return new Promise(function(resolve, reject) {
		// GET /zosmf/restfiles/ds?dslevel=<dataset_name_pattern>[&volser=<volser>&start=<dsname>]
		options.path = `/zosmf/restconsoles/consoles/ibmusecn`;
		options.method = 'PUT';
		if (!options.hostname || !options.auth || !options.hlq)
			reject({ error: 'parms missing' });
		if (!options.headers)
            options.headers = { 'X-CSRF-ZOSMF-HEADER': 'ZOSMF',
        'Content-Type':'application/json' };
		// if (!options.volser)
		// 	options.path = `/zosmf/restfiles/ds?dslevel=${options.hlq}`;
		resolve(options);
	});
};

const listDsn = async options => {
	options = await handleOptions(options).catch(e => e);
	return await makeRequest(options).catch(e => e);
	// console.log('results :', results);
	// return results;
};

listDsn(options)
	.then(res => {
		console.log('res :', res);
	})
	.catch((e) => {
		console.log('e :', e);
	});