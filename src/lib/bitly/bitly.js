/*
 * Bitly API related operations
 *
 */

// Dependencies
const {
    summary,
    parseSummary
} = require('./bitly-stats.js');
const Conf = require('conf');
const conf = new Conf();


// Export
module.exports = function () {

    // Formulate a bitly client validated by a secure token
    const {
        BitlyClient
    } = require('bitly');
    const token = conf.get('bitly_key') || process.env.bitly_key;
    const bitly = new BitlyClient(token);

    // Extend the bitly client object with two summary functions
    bitly.summary = summary;
    bitly.parseSummary = parseSummary;

    return bitly;
};
