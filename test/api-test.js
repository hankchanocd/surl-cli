#!/usr/bin/env node --harmony

/*
 * API Test
 * ps. Each API test is default to the timeout of 6000 ms.
 * ps. `npm test` also runs test at the timeout of 6000 ms.
 *
 */

/* jshint ignore:start */

// Dependencies
const expect = require("expect.js"); // expect.js provides syntatic sugar on testing
const api = require("./../build/lib/request.js");
const googl = require("./../build/lib/google/google.js");
const bitly = require("./../build/lib/bitly/bitly.js")();

// Holder object
const apiTest = function () {
    // Test REST API get methods
    describe("surl -r [shortUrl] (expand url)", () => {
        // Testing bitly
        it("Expand shortUrl using bitly #1", () => {
            return bitly.expand("http://bit.ly/2uVScFX").then(result => {
                expect(result.expand[0].long_url).to.equal(
                    "http://tanepiper.github.io/node-bitly/classes/_bitly_.bitlyclient.html"
                );
            });
        }).timeout(6000);

        // Testing goo.gl
        it("Expand shortUrl using goo.gl #1", () => {
            let url = googl.expandUrl("https://goo.gl/BBLkF7");
            return api.get(url).then(result => {
                expect(result.longUrl).to.equal(
                    "https://www.youtube.com/watch?v=fViHxVwA6hk"
                );
            });
        }).timeout(6000);

        it("Expand shortUrl using goo.gl #2", () => {
            let url = googl.expandUrl("https://goo.gl/cL3Txj");
            return api.get(url).then(result => {
                expect(result.longUrl).to.equal(
                    "https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial?utm_campaign=Toptal%20Engineering%20Blog&utm_source=hs_email&utm_medium=email&utm_content=64672704&_hsenc=p2ANqtz-_ws751vZGVLMPi_g0JYhTM59tJIuCBp5-Bn_0RJ8Uhlp0tYsYY9WkXntB6lsiBKDYsjW_3LVOQFrVFkXz_b3XSAaBfWg&_hsmi=64672706"
                );
            });
        }).timeout(6000);
    });

    // Test REST API post methods
    describe("surl [longUrl] (shorten url)", () => {
        // Testing bitly
        it("Sending response to Bitly", () => {
            return bitly.shorten(
                "http://tanepiper.github.io/node-bitly/classes/_bitly_.bitlyclient.html"
            ).then(result => {
                expect(result.url).to.equal("http://bit.ly/2uVScFX");
            });
        }).timeout(6000);

        // Testing goo.gl
        let urlWithKey = googl.shortenUrl();
        it("Shorten longUrl using goo.gl #1", () => {
            return api.post(
                urlWithKey,
                "https://www.youtube.com/watch?v=fViHxVwA6hk"
            ).then(result => {
                expect(result.id).to.equal("https://goo.gl/BBLkF7");
            });
        }).timeout(6000);

        it("Shorten longUrl using goo.gl #2", () => {
            return api.post(
                urlWithKey,
                "https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial?utm_campaign=Toptal%20Engineering%20Blog&utm_source=hs_email&utm_medium=email&utm_content=64672704&_hsenc=p2ANqtz-_ws751vZGVLMPi_g0JYhTM59tJIuCBp5-Bn_0RJ8Uhlp0tYsYY9WkXntB6lsiBKDYsjW_3LVOQFrVFkXz_b3XSAaBfWg&_hsmi=64672706"
            ).then(result => {
                expect(result.id).to.equal("https://goo.gl/cL3Txj");
            });
        }).timeout(6000);
    });

    // Test the data integrity of usage statistics
    describe("surl --stats [shortUrl] (usage statistics)", () => {
        // Testing bitly
        it("Testing the response integrity from Bitly", () => {
            let input = "http://bit.ly/2uVScFX";
            return Promise.all([
                bitly.info(input),
                bitly.expand(input),
                bitly.clicks(input),
                bitly.clicksByDay(input),
                bitly.countries(input)
            ]).then(result => {
                return bitly.parseSummary(result);
            }).then(result => {
                expect(result.title).to.equal("BitlyClient | bitly");
                expect(result.shortUrl).to.equal("http://bit.ly/2uVScFX");
                expect(result.longUrl).to.equal(
                    "http://tanepiper.github.io/node-bitly/classes/_bitly_.bitlyclient.html"
                );
                expect(result.userClicks).to.be.a("number");
                expect(result.globalClicks).to.be.a("number");
                expect(result.clicksByDay).to.be.a("object");
                expect(result.clicksByDay).to.be.ok(); // testing truthiness
                expect(result.clicksByDay[0]).to.have.key("clicks");
                expect(result.clicksByCountry).to.be.a("object");
                expect(result.clicksByCountry).to.be.ok(); // testing truthiness
                expect(result.clicksByCountry[0]).to.have.key("country");
                expect(result).to.only.have.keys([
                    "title",
                    "shortUrl",
                    "longUrl",
                    "userClicks",
                    "globalClicks",
                    "clicksByDay",
                    "clicksByCountry"
                ]);
            });
        }).timeout(6000);

        // Testing goo.gl
        it("Testing the response integrity from goo.gl", () => {
            let url = googl.statsUrl("https://goo.gl/zZYDD8");
            return api.get(url).then(result => {
                return googl.parseSummary(result);
            }).then(result => {
                expect(result.shortUrl).to.equal("http://goo.gl/zZYDD8");
                expect(result.longUrl).to.equal(
                    "http://tanepiper.github.io/node-bitly/classes/_bitly_.bitlyclient.html"
                );
                expect(result.date).to.be.equal("2018 7 28");
                expect(result.analytics).to.be.a("object");
                expect(result.analytics).to.be.ok(); // testing truthiness/Not Null
                expect(result.analytics).to.not.be.empty(); // testing emptiness
                expect(result.analytics).to.have.keys([
                    "allTime",
                    "month",
                    "week",
                    "day",
                    "twoHours"
                ]);
                expect(result).to.only.have.keys([
                    "shortUrl",
                    "longUrl",
                    "date",
                    "analytics"
                ]);
            });
        }).timeout(6000);
    });
};

/* jshint ignore:end */

// Export
module.exports = apiTest;
