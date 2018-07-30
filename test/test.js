#!/usr/bin/env node --harmony

/*
 * Test
 * ps. --harmony indicates to Node to run using ES8
 * ps. The command to run the test with Mocha is modified to allow 5000 ms at max response time
 */
/* jshint ignore:start */


// Dependencies
const expect = require('expect.js');
const chalk = require('chalk');
const api = require('../build/lib/api.js');



// Configurations Retrieval
const Conf = require('conf');
const conf = new Conf();

// Create bitly client
const { BitlyClient } = require('bitly');
let bitlyToken = conf.get('bitly_key');
const bitly = new BitlyClient(bitlyToken);


// Test REST API post methods
describe('surl [longUrl] (shorten url)', () => {

    // Testing bitly
    it('Sending response to Bitly', async() => {
        let result = {};
        try {
            result = await bitly.shorten('http://tanepiper.github.io/node-bitly/classes/_bitly_.bitlyclient.html');
        } catch (e) {
            console.log(e);
        }
        expect(result.url).to.equal("http://bit.ly/2uVScFX");
    });


    // Testing goo.gl
    let apiKey = conf.get('google_key');
    let url = 'https://www.googleapis.com/urlshortener/v1/url';
    let urlWithKey = url + '?key=' + apiKey;

    it('Shorten longUrl using goo.gl #1', async() => {
        let result = await api.post(urlWithKey, "https://www.youtube.com/watch\?v\=fViHxVwA6hk");
        expect(result.id).to.equal("https://goo.gl/BBLkF7");
    });

    it('Shorten longUrl using goo.gl #2', async() => {
        let result = await api.post(urlWithKey, "https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial?utm_campaign=Toptal%20Engineering%20Blog&utm_source=hs_email&utm_medium=email&utm_content=64672704&_hsenc=p2ANqtz-_ws751vZGVLMPi_g0JYhTM59tJIuCBp5-Bn_0RJ8Uhlp0tYsYY9WkXntB6lsiBKDYsjW_3LVOQFrVFkXz_b3XSAaBfWg&_hsmi=64672706");
        expect(result.id).to.equal("https://goo.gl/cL3Txj");
    });

});


// Test REST API get methods
describe('surl -r [shortUrl] (expand url)', () => {

    // Testing bitly
    it('Expand shortUrl using bitly #1', async() => {
        let result = {};
        try {
            result = await bitly.expand('http://bit.ly/2uVScFX');
        } catch (e) {
            console.log(e);
        }
        expect(result.expand[0].long_url).to.equal("http://tanepiper.github.io/node-bitly/classes/_bitly_.bitlyclient.html");
    });


    // Testing goo.gl
    let apiKey = conf.get('google_key');
    let url = 'https://www.googleapis.com/urlshortener/v1/url';
    let urlWithKey = url + '?key=' + apiKey;

    it('Expand shortUrl using goo.gl #1', async() => {
        let input = "https://goo.gl/BBLkF7";
        let urlToExpand = url + '?shortUrl=' + input + '&key=' + apiKey;
        let result = await api.get(urlToExpand);
        expect(result.longUrl).to.equal("https://www.youtube.com/watch\?v\=fViHxVwA6hk");
    });

    it('Expand shortUrl using goo.gl #2', async() => {
        let input = "https://goo.gl/cL3Txj";
        let urlToExpand = url + '?shortUrl=' + input + '&key=' + apiKey;
        let result = await api.get(urlToExpand);
        expect(result.longUrl).to.equal("https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial?utm_campaign=Toptal%20Engineering%20Blog&utm_source=hs_email&utm_medium=email&utm_content=64672704&_hsenc=p2ANqtz-_ws751vZGVLMPi_g0JYhTM59tJIuCBp5-Bn_0RJ8Uhlp0tYsYY9WkXntB6lsiBKDYsjW_3LVOQFrVFkXz_b3XSAaBfWg&_hsmi=64672706");
    });

});

/* jshint ignore:end */
