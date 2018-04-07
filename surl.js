#!/usr/bin/env node --harmony

'use strict';

/**
 * modules
 */
 const program = require('commander');
 const chalk = require('chalk');

 const {expandUrl, shortenUrl} = require('./lib/ajax');

// This program is a lightweight cli tool for shortening url using various api providers, 
// including but not limited to Google, Bitly

program
.version('1.0.0', '-v, --version')
.usage('<option> [url]')
.description(`surl shortens the long url using ${chalk.bold('Google ShortenUrl api')} and ${chalk.bold('Bitly api')}`)
.option('-r, --reverse', 'Expand the shortened url')
.on('--help', function () {
    console.log();
    console.log(`  ${chalk.blueBright('surl [longUrl]')}`);
    console.log(`  ${chalk.blueBright('=> the shortened url is copied to clipboard [shortUrl]')}`);
    console.log();
    console.log(`  ${chalk.blueBright('surl -r [shortUrl]')}`);
    console.log(`  ${chalk.blueBright('=> the expanded url is copied to clipboard [longUrl]')}`);
})
.action((url, options) => {
    if (!options.reverse) {
        shortenUrl(url);
        
    } else {
        expandUrl(url);
    }
});


program.parse(process.argv);

// Display help table when no arg is provided
if (program.args.length === 0) program.help();
