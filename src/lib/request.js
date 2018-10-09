/*
 * request.js is self-made RESTful request operation, designed for those URL shortening services
 * that don't have a proper custom request client implementation, unlike BitlyClient
 *
 */
'use strict';

/* Jshint doesn't support es8 features yet */
/* jshint ignore:start */

// Dependencies
const fetch = require('node-fetch');


// Init app
const request = {};


// get() returns parsed json from fetch()
request.get = async function (urlToExpand) {
    let response = await fetch(urlToExpand);
    let body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }

    return body;
};


// post returns parsed json from fetch()
request.post = async function (urlWithKey, urlToShorten) {
    let response = await fetch(urlWithKey, {
        method: 'POST',
        body: JSON.stringify({
            longUrl: urlToShorten
        }),
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
module.exports = request;
