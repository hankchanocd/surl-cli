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
const bitlyStats = require('./../build/lib/bitly/bitly-stats.js');


// Holder object
const unitTest = function () {

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


        // HashPartKey
        it('Hash part key #1', () => {
            expect(util.hashPartKey()).to.not.be.ok();
        });

        it('Hash part key #2', () => {
            expect(util.hashPartKey('')).to.not.be.ok();
        });

        it('Hash part key #3', () => {
            expect(util.hashPartKey(12345678)).to.equal('1xxxxx8');
        });

        it('Hash part key #4', () => {
            expect(util.hashPartKey(12345678)).to.be.a('string');
        });

    });


    // Testing google-stats.js
    describe('Testing google-stats.js', () => {

        // Test the inner strength of clicksCountriesUI
        it('Test clicksCountriesUI #1', () => {
            expect(googleStats.clicksCountriesUI({})).to.equal(chalk.grey('COUNTRIES DATA NaN'));
        });

        it('Test clicksCountriesUI #2', () => {
            expect(googleStats.clicksCountriesUI({
                allTime: {}
            })).to.equal(chalk.grey('COUNTRIES DATA NaN'));
        });

        it('Test clicksCountriesUI #3', () => {
            expect(googleStats.clicksCountriesUI({
                allTime: ''
            })).to.equal(chalk.grey('COUNTRIES DATA NaN'));
        });

        it('Test clicksCountriesUI #4', () => {
            expect(googleStats.clicksCountriesUI({
                allTime: []
            })).to.equal(chalk.grey('COUNTRIES DATA NaN'));
        });

        it('Test clicksCountriesUI #5', () => {
            expect(googleStats.clicksCountriesUI({
                allTime: {
                    countries: [{
                        id: 'CA',
                        count: 0
                    }]
                }
            })).to.contain('CA');
        });

        it('Test clicksCountriesUI #6', () => {
            expect(googleStats.clicksCountriesUI({
                allTime: {
                    countries: [{
                        id: 'CA',
                        count: 0
                    }]
                }
            })).to.contain(0);
        });

        it('Test clicksPeriodsUI #1', () => {
            expect(googleStats.clicksPeriodUI({})).to.equal('');
        });

        it('Test clicksPeriodsUI #2', () => {
            expect(googleStats.clicksPeriodUI({
                allTime: {},
                month: {},
                week: {},
                day: {},
                twoHours: {}
            })).to.contain('NaN');
        });


        // Test the inner strength of parseSummary
        it('Test parseSummary returns all the required keys it promised', () => {
            expect(googleStats.parseSummary({})).to.only.have.keys(['shortUrl', 'longUrl', 'date', 'analytics']);
        });
    });


    // Testing bitly-stats.js
    describe('Testing bitly-stats.js', () => {

        // Test the inner strength of parseSummary
        it('Test parseSummary to be able to throw error', () => {
            expect(bitlyStats.parseSummary).to.throwError();
        });

    });

};


// Export
module.exports = unitTest;
