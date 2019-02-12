// ------------------------------------------------------------
//
//  Author:   William Pereira
//  Date:     02/11/2019
//  Function: Use request-promise for the https requests
//
// ------------------------------------------------------------
// How to use:
// makeRequest(options)
//     .then(results => console.log('results :', results))
//     .catch(e => console.log('e :', e));
// ------------------------------------------------------------
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const https = require('https');

const makeRequest = options =>
    new Promise(function(resolve, reject) {
        let results = https.request(options, res => {
            res.setEncoding('utf8');
            let body = '';

            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                resolve(body);
            });
        });
        if (options.body) {
            results.write(JSON.stringify(options.body));
        }
        results.on('error', e => {
            reject(e);
        });
        results.end();
    });

module.exports = makeRequest;
