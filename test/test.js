#!/usr/bin/env node --harmony

/*
 * Test
 * ps. --harmony indicates to Node to run using ES8
 * ps. The command to run the test with Mocha is modified to allow maximum of 5000 ms response time
 *
 */

/* jshint ignore:start */


// Dependencies
const expect = require('expect.js'); // expect.js provides syntatical sugar on testing
const chalk = require('chalk');
const api = require('../build/lib/api.js');
const googl = require('../build/lib/google/google.js');
const bitly = require('../build/lib/bitly/bitly.js')();


// Indiate to users the Mocha is modified to allow 5000 ms response time
console.log(chalk.gray('Warning: Mocha command is modified to allow maximum of 5000 ms response time for API testing'));


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
    it('Expand shortUrl using goo.gl #1', async() => {
        let url = googl.expandUrl("https://goo.gl/BBLkF7");
        let result = await api.get(url);
        expect(result.longUrl).to.equal("https://www.youtube.com/watch\?v\=fViHxVwA6hk");
    });

    it('Expand shortUrl using goo.gl #2', async() => {
        let url = googl.expandUrl("https://goo.gl/cL3Txj");
        let result = await api.get(url);
        expect(result.longUrl).to.equal("https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial?utm_campaign=Toptal%20Engineering%20Blog&utm_source=hs_email&utm_medium=email&utm_content=64672704&_hsenc=p2ANqtz-_ws751vZGVLMPi_g0JYhTM59tJIuCBp5-Bn_0RJ8Uhlp0tYsYY9WkXntB6lsiBKDYsjW_3LVOQFrVFkXz_b3XSAaBfWg&_hsmi=64672706");
    });

});


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
    let urlWithKey = googl.shortenUrl();
    it('Shorten longUrl using goo.gl #1', async() => {
        let result = await api.post(urlWithKey, "https://www.youtube.com/watch\?v\=fViHxVwA6hk");
        expect(result.id).to.equal("https://goo.gl/BBLkF7");
    });

    it('Shorten longUrl using goo.gl #2', async() => {
        let result = await api.post(urlWithKey, "https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial?utm_campaign=Toptal%20Engineering%20Blog&utm_source=hs_email&utm_medium=email&utm_content=64672704&_hsenc=p2ANqtz-_ws751vZGVLMPi_g0JYhTM59tJIuCBp5-Bn_0RJ8Uhlp0tYsYY9WkXntB6lsiBKDYsjW_3LVOQFrVFkXz_b3XSAaBfWg&_hsmi=64672706");
        expect(result.id).to.equal("https://goo.gl/cL3Txj");
    });

});


// Test the data integrity of usage statistics
describe('surl --stats [shortUrl] (usage statistics)', () => {

    // Testing bitly
    it('Testing the response integrity from Bitly', async() => {

        let input = 'http://bit.ly/2uVScFX';
        let result = {};
        try {
            result = await Promise.all([
                bitly.info(input),
                bitly.expand(input),
                bitly.clicks(input),
                bitly.clicksByDay(input),
                bitly.countries(input)
            ]);
            result = await bitly.parseSummary(result);

        } catch (err) {
            console.log(chalk.redBright(`ERROR: ${err.message}`));
        }

        expect(result.title).to.equal("BitlyClient | bitly");
        expect(result.shortUrl).to.equal("http://bit.ly/2uVScFX");
        expect(result.longUrl).to.equal("http://tanepiper.github.io/node-bitly/classes/_bitly_.bitlyclient.html");
        expect(result.userClicks).to.be.a('number');
        expect(result.globalClicks).to.be.a('number');
        expect(result.clicksByDay).to.be.a('object');
        expect(result.clicksByDay).to.be.ok(); // testing truthiness
        expect(result.clicksByDay[0]).to.have.key('clicks');
        expect(result.clicksByCountry).to.be.a('object');
        expect(result.clicksByCountry).to.be.ok(); // testing truthiness
        expect(result.clicksByCountry[0]).to.have.key('country');
    });


    // Testing goo.gl
    it('Testing the response integrity from goo.gl', async() => {

        let url = googl.statsUrl('https://goo.gl/zZYDD8');
        let result = {};
        try {
            result = await api.get(url);
            result = await googl.parseSummary(result);

        } catch (err) {
            console.log(chalk.redBright(`ERROR: ${err.message}`));
        }

        expect(result.shortUrl).to.equal("http://goo.gl/zZYDD8");
        expect(result.longUrl).to.equal("http://tanepiper.github.io/node-bitly/classes/_bitly_.bitlyclient.html");
        expect(result.date).to.be.equal('2018 7 28');
        expect(result.analytics).to.be.a('object');
        expect(result.analytics).to.be.ok(); // testing truthiness/Not Null
        expect(result.analytics).to.not.be.empty(); // testing emptiness
        expect(result.analytics).to.have.keys(['allTime', 'month', 'week', 'day', 'twoHours']);
    });

});

/* jshint ignore:end */
