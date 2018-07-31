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
const googleStats = require('./../build/lib/google/google-stats.js');


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

        it('Identify API provider with random URL', () => {
            expect(util.identifyAPIProvider('https://www.washingtonpost.com')).to.equal('');
        });


        // Produce a full date object out of a given number
        it('Get full date #1', () => {
            let fakeDate = Date.parse('2018-07-01T12:00:00.000Z');
            expect(util.fullDate(fakeDate)).to.equal('2018 7 1');
        });

        it('Get full date #2', () => {
            expect(util.fullDate({})).to.be(undefined);
        });

    });


    // Testing google-stats.js
    describe('Testing google-stats.js', () => {

        // Test the inner strength of clicksCountriesUI
        it('Test clicksCountriesUI #1', () => {
            expect(googleStats.clicksCountriesUI({})).to.equal(chalk.grey('COUNTRIES DATA NaN'));
        });

        it('Test clicksCountriesUI #2', () => {
            expect(googleStats.clicksCountriesUI({ allTime: {} })).to.equal(chalk.grey('COUNTRIES DATA NaN'));
        });

        it('Test clicksCountriesUI #3', () => {
            expect(googleStats.clicksCountriesUI({ allTime: '' })).to.equal(chalk.grey('COUNTRIES DATA NaN'));
        });

        it('Test clicksCountriesUI #4', () => {
            expect(googleStats.clicksCountriesUI({ allTime: [] })).to.equal(chalk.grey('COUNTRIES DATA NaN'));
        });

        it('Test clicksCountriesUI #5', () => {
            expect(googleStats.clicksCountriesUI({ allTime: { countries: [{ id: 'CA', count: 0 }] } })).to.contain('CA');
        });

        it('Test clicksCountriesUI #5', () => {
            expect(googleStats.clicksCountriesUI({ allTime: { countries: [{ id: 'CA', count: 0 }] } })).to.contain(0);
        });
    });


};


// Export
module.exports = unitTest;
