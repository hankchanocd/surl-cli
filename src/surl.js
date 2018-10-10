#!/usr/bin/env node --harmony

'use strict';

/*
 * This program is a lightweight cli tool for shortening url using various api providers,
 * including but not limited to Bitly, Firebase, and Goo.gl
 *
 */

// Dependencies
const program = require('commander');
const chalk = require('chalk');

// Action
const {
    expandUrl,
    shortenUrl,
    stats,
    rawStats
} = require('./get');
const config = require('./config');
const init = require('./init');


program
    .version('2.0.1', '-v, --version')
    .usage('[option] [url]')
    .description(`surl shortens long urls using ${chalk.bold('Bitly API')},` +
        ` ${chalk.bold('Firebase API')}, and ${chalk.bold('goo.gl API')}`)
    .option('-r, --reverse', 'expand the shortened url')
    .option('-s, --stats', "display a shortUrl's analytics")
    .option('--rawstats', "display a shortUrl's analytics in raw data")
    .option('--showconfig', 'show saved configuration details')
    .on('--help', function () {
        console.log();
        console.log('  Please initiate configuration for default API provider and API keys/tokens before start using surl');
        console.log(`  ${chalk.blueBright('surl init')}`);
        console.log();
        console.log(`  You can later change the default API provider and update API keys/tokens using`);
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
        console.log(`  ${chalk.green(
        '=> shortUrl: http://bit.ly/surl-cli\n' +
        '     origin: https://github.com/hankchanocd/surl-cli\n' +
        '     created: 2018 07 28')}`);
        console.log();
        console.log(`  If you don't know how to retrieve your API key/token from these API providers,\n` +
            `  refer to our guide on Github (http://bit.ly/surl-cli)`);
        console.log();
    })
    .action((url, options) => {

        if (!options) return; // Return helper if no options is provided

        if (options.reverse) {
            expandUrl(url);

        } else if (options.stats) {
            stats(url);

        } else if (options.rawstats) {
            rawStats(url);

        } else if (process.argv[2] === 'init') {
            init.inquire();

        } else if (process.argv[2] === 'config') {
            config.inquire();

        } else if (process.argv[2] === 'showconfig') {
            config.showConfig();

        } else {
            shortenUrl(url);
        }
    });

program.parse(process.argv);



// Display help table when no arg is provided
if (program.args.length === 0) program.help();
