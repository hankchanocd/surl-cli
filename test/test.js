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
const apiTest = require('./api-test.js');
const unitTest = require('./unit-test.js');


function test() {
    // Indicate to users that Mocha is modified to allow 5000 ms response time
    console.log(chalk.gray('Warning: Mocha command is modified to allow maximum of 5000 ms response time for API testing\n'));


    // API tests
    apiTest();


    // Unit tests
    unitTest();
};


test();


/* jshint ignore:end */
