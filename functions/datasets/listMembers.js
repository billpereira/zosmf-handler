// ------------------------------------------------------------
//
//  Author:   William Pereira
//  Date:     02/15/2019
//  Function: List members of a PDS
//
// ------------------------------------------------------------
// How to use:
// listMembers(options)
// 	.then(res => console.log('res :', res))
// 	.catch(e => console.log('error :', e));
// ------------------------------------------------------------

const makeRequest = require('../../services/https-request');
const options = require('../../config/options');

const handleOptions = options => {
	return new Promise(function(resolve, reject) {
		// GET /zosmf/restfiles/ds/<dataset-name>/member?start=<member>&pattern=<mem-pat>
		options.path = `/zosmf/restfiles/ds/${options.pds}/member`;
		options.method = 'GET';
		if (!options.hostname || !options.auth || !options.pds)
			reject({ error: 'parms missing' });
		if (!options.headers)
			options.headers = {
				'X-CSRF-ZOSMF-HEADER': 'ZOSMF',
				'X-IBM-Attributes': 'base'
			};
		if (options.pdsStart && options.pdsPattern)
			options.path =
				options.path +
				`?start=${options.pdsStart}&pattern=${options.pdsPattern}`;
		else {
			if (options.pdsStart)
				options.path = options.path + `?start=${options.pdsStart}`;
			if (options.pdsPattern)
				options.path = options.path + `?pattern=${options.pdsPattern}`;
		}
		resolve(options);
	});
};

const listMembers = async options => {
	options = await handleOptions(options).catch(e => e);
	return await makeRequest(options).catch(e => e);
};


module.exports = listMembers;
