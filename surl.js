#!/usr/bin/env node --harmony

'use strict';

/**
 * modules
 */
 const program = require('commander');
 const chalk = require('chalk');

 const {expandUrl, shortenUrl, stats} = require('./lib/get');
 const config = require('./lib/config');
 const init = require('./lib/init');

// This program is a lightweight cli tool for shortening url using various api providers, 
// including but not limited to Google, Bitly

program
.version('1.0.0', '-v, --version')
.usage('[option] [url]')
.description(`surl shortens long urls using ${chalk.bold('Google ShortenUrl api')} and ${chalk.bold('Bitly api')}`)
.option('-r, --reverse', 'expand the shortened url')
.option('-s, --stats', "display a shortUrl's analytics")
.on('--help', function () {
    console.log();
    console.log('  Please initiate configuration for api providers and api keys before start using surl');
    console.log(`  ${chalk.blueBright('surl init')}`);
    console.log();
    console.log(`  You can later modify configuration using`);
    console.log(`  ${chalk.blueBright('surl config')}`);
    console.log();
    console.log('  Examples:');
    console.log(`  ${chalk.blueBright('surl [longUrl]')}`);
    console.log(`  ${chalk.green('=> success! [shortened url] copied to clipboard')}`);
    console.log();
    console.log(`  ${chalk.blueBright('surl -r [shortUrl]')}`);
    console.log(`  ${chalk.green('=> success! expanded url copied to clipboard')}`);
    console.log();
    console.log(`  ${chalk.blueBright('surl --stats [shortUrl]')}`);
    console.log(`  ${chalk.green('=> shortUrl: http://goo.gl/fbsS\n     origin: http://www.google.com/\n     created: 2009 11 12')}`);
    console.log();
})
.action((url, options) => {

    if (options.reverse) {
        expandUrl(url);

    } else if (options.stats) {
        stats(url);

    } else if (process.argv[2] === 'init') {
        init.inquire();

    } else if (process.argv[2] === 'config') {
        config.inquire();

    } else {
        shortenUrl(url);
    }
});

program.parse(process.argv);



// Display help table when no arg is provided
if (program.args.length === 0) program.help();
