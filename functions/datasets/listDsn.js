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
	// console.log('results :', results);
	// return results;
};

listDsn(options)
	.then(res => {
		console.log('res :', res);
		// return Promise.resolve(res)
	})
	.catch((e) => {
		console.log('e :', e);
	});

// console.log('abc :', listDsn(options));

// const teste = await handleOptions(options).catch(error => error)
// console.log('teste :', teste);

// main()
// var listDsn = options => {
//     makeRequest(options)
//         .then(res => console.log('res :', res))
//         .catch(e => console.log('e :', e));
// };

// listDsn(options);
