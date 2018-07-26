/*
 * api.js deals with RESTful api operations
 *
 */

/* Jshint doesn't support es8 features yet */
/* jshint ignore:start */

// Dependencies
const fetch = require('node-fetch');


// Init app
const api = {};


// get() returns parsed json from fetch()
api.get = async function(urlToExpand) {
    let response = await fetch(urlToExpand);
    let body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }

    return body;
};


// post returns parsed json from fetch()
api.post = async function(urlWithKey, urlToShorten) {
    let response = await fetch(urlWithKey, {
        method: 'POST',
        body: JSON.stringify({
            longUrl: urlToShorten
        }), // payload is body for options in fetch()
        headers: {
            'Content-type': 'application/json'
        }
    });
    let body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }

    return body;
};


/* jshint ignore:end */


// Export module
module.exports = api;
