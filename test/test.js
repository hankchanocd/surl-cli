#!/usr/bin/env node --harmony
'use strict';

/*
 * Test
 * ps. --harmony indicates to Node to run using ES8
 * ps. The command to run the test with Mocha is modified to allow maximum of 6000 ms response time
 *
 */

/* jshint ignore:start */


// Dependencies
const chalk = require('chalk');
const apiTest = require('./api-test.js');
const unitTest = require('./unit-test.js');


(function test() {
    console.log('\n> Running Tests...');

    // Indicate to users that Mocha is modified to allow 6000 ms response time
    console.log(chalk.gray('Warning: Mocha command is modified to allow maximum of 6000 ms response time for API testing\n'));

    // Determine the running mode
    const currentEnv = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

    if (currentEnv === 'unit') {
        unitTest();

    } else {
        apiTest();
        unitTest();
    }

})();
/* jshint ignore:end */
