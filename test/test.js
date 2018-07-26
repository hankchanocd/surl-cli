#!/usr/bin/env node --harmony

/*
 * Test
 * ps. --harmony indicates to Node to run using ES8
 *
 */
/* jshint ignore:start */


// Dependencies
const expect = require('expect.js');
const Conf = require('conf');
const conf = new Conf();
const apiKey = conf.get('key');
const api = require('../build/api/api.js');


// Retrieve data from configurations for accessing the preferred API provider
const url = conf.get('providerUrl');
const urlWithKey = url + '?key=' + apiKey;


// Test post
describe('surl [longUrl]', () => {

    it('Shorten longUrl #1', async() => {
        let result = await api.post(urlWithKey, "https://www.youtube.com/watch\?v\=fViHxVwA6hk");
        expect(result.id).to.equal("https://goo.gl/BBLkF7");
    });

    it('Shorten longUrl #2', async() => {
        let result = await api.post(urlWithKey, "https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial?utm_campaign=Toptal%20Engineering%20Blog&utm_source=hs_email&utm_medium=email&utm_content=64672704&_hsenc=p2ANqtz-_ws751vZGVLMPi_g0JYhTM59tJIuCBp5-Bn_0RJ8Uhlp0tYsYY9WkXntB6lsiBKDYsjW_3LVOQFrVFkXz_b3XSAaBfWg&_hsmi=64672706");
        expect(result.id).to.equal("https://goo.gl/cL3Txj");
    });

});


// Test get
describe('surl -r [shortUrl]', () => {

    it('Expand shortUrl #1', async() => {
        let input = "https://goo.gl/BBLkF7";
        let urlToExpand = url + '?shortUrl=' + input + '&key=' + apiKey;
        let result = await api.get(urlToExpand);
        expect(result.longUrl).to.equal("https://www.youtube.com/watch\?v\=fViHxVwA6hk");
    });

    it('Expand shortUrl #2', async() => {
        let input = "https://goo.gl/cL3Txj";
        let urlToExpand = url + '?shortUrl=' + input + '&key=' + apiKey;
        let result = await api.get(urlToExpand);
        expect(result.longUrl).to.equal("https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial?utm_campaign=Toptal%20Engineering%20Blog&utm_source=hs_email&utm_medium=email&utm_content=64672704&_hsenc=p2ANqtz-_ws751vZGVLMPi_g0JYhTM59tJIuCBp5-Bn_0RJ8Uhlp0tYsYY9WkXntB6lsiBKDYsjW_3LVOQFrVFkXz_b3XSAaBfWg&_hsmi=64672706");
    });

});

/* jshint ignore:end */
