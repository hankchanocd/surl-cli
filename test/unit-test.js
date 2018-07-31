#!/usr/bin/env node --harmony

/*
 * Unit Test
 *
 */

/* jshint ignore:start */


// Dependencies
const expect = require('expect.js'); // expect.js provides syntatical sugar on testing
const chalk = require('chalk');
const util = require('./../build/lib/util.js');


// Holder object
const unitTest = function() {

    // Testing util.js
    describe('Testing util.js', () => {

        // Identify API provider
        it('Identify API provider with goo.gl', () => {
            expect(util.identifyAPIProvider('https://goo.gl/6Bic3U')).to.equal('google');
        });

        it('Identify API provider with bitly', () => {
            expect(util.identifyAPIProvider('http://bit.ly/2M2aWdl')).to.equal('bitly');
        });


        // Produce a full date object out of a given number
        it('Get full date', () => {
            let fakeDate = Date.parse('2018-07-01T12:00:00.000Z');
            expect(util.fullDate(fakeDate)).to.equal('2018 7 1');
        });        

    });

};


// Export
module.exports = unitTest;
