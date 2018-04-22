#!/usr/bin/env node --harmony

const assert = require('assert');
const {expandUrl, shortenUrl, stats} = require('../lib/get');

// Test get
describe('surl [url]', () => {
    
    it('Shortens longUrl', function() {
        const response = expandUrl("https://www.youtube.com/watch\?v\=fViHxVwA6hk");
        const rightRes = 'success! https://goo.gl/BBLkF7 copied to clipboard';
        assert.equal(rightRes, response);
    });
});
