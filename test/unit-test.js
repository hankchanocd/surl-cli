#!/usr/bin/env node --harmony

/*
 * Unit Test
 *
 */

/* jshint ignore:start */


// Dependencies
const expect = require('expect.js'); // expect.js provides syntatical sugar on testing
const chalk = require('chalk');


// Holder object
const unitTest = function() {

    // Testing .js
    describe('.js', () => {
        it('', () => {
            expect(1).to.equal(1);
        });

    });

}


// Export
module.exports = unitTest;
