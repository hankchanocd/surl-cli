#!/usr/bin/env node --harmony

'use strict';

/**
 * modules
 */
 const program = require('commander');
 const chalk = require('chalk');

 const {expandUrl, shortenUrl, stats} = require('./lib/ajax');

// This program is a lightweight cli tool for shortening url using various api providers, 
// including but not limited to Google, Bitly

program
.version('1.0.0', '-v, --version')
.usage('<option> [url]')
.description(`surl shortens the long url using ${chalk.bold('Google ShortenUrl api')} and ${chalk.bold('Bitly api')}`)
.option('-r, --reverse', 'expand the shortened url')
.option('-s, --stats', "display a shortUrl's analytics")
.on('--help', function () {
    console.log();
    console.log(`  ${chalk.blueBright('Examples:')}`);
    console.log(`  ${chalk.blueBright('surl [longUrl]')}`);
    console.log(`  ${chalk.blueBright('=> success! [shortened url] copied to clipboard')}`);
    console.log();
    console.log(`  ${chalk.blueBright('surl -r [shortUrl]')}`);
    console.log(`  ${chalk.blueBright('=> success! expanded url copied to clipboard')}`);
    console.log();
    console.log(`  ${chalk.blueBright('surl --stats [shortUrl]')}`);
})
.action((url, options) => {

    if (options.reverse) {
        expandUrl(url);

    } else if (options.stats) {
        stats(url);

    } else {
        shortenUrl(url);
    }
});


program.parse(process.argv);

// Display help table when no arg is provided
if (program.args.length === 0) program.help();
