/*
 * Configuration
 *
 */
'use strict';

// Dependencies
const inquirer = require('inquirer');
const hashPartKey = require('./lib/util.js').hashPartKey;
const chalk = require('chalk');
const columnify = require('columnify');
const Conf = require('conf');
const conf = new Conf();


// Holder object
const config = {};

config.inquire = function inquire() {

    // Config script should be allowed to run only after the init script is called
    if (!config.isInitCalledYet(conf)) {
        console.log(chalk.gray(`${chalk.white('`surl config`')} can only be used after ${chalk.white('`surl init`')} is called`));
        return; // Exiting if init script has not been called yet
    }

    let questions = [{
            type: 'list',
            name: 'defaultProvider',
            message: "Change your URL shortener api provider",
            choices: ['bitly', 'firebase', 'google'],
            filter: function (val) {
                return val.toLowerCase();
            }
        },
        {
            type: 'input',
            name: 'bitly_key',
            message: "Modify your bitly api key",
            default: function () {
                return conf.get('bitly_key');
            }
        },
        {
            type: 'input',
            name: 'firebase_key',
            message: "Your firebase api key (or enter to skip)",
            default: function () {
                return conf.get('firebase_key');
            }
        },
        {
            type: 'input',
            name: 'google_key',
            message: "Modify your google api key",
            default: function () {
                return conf.get('google_key');
            }
        }
    ];

    inquirer.prompt(questions).then(answers => {
        conf.set('defaultProvider', answers.defaultProvider);
        conf.set('bitly_key', answers.bitly_key);
        conf.set('firebase_key', answers.firebase_key);
        conf.set('google_key', answers.google_key);

        console.log('saved');
        return;
    }).catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
};


// Check to see if init script is being called the first time
config.isInitCalledYet = function isInitCalledYet(conf) {

    if (conf.get('init_run_time_counter')) {
        return true;
    } else {
        return false;
    }
};


// Display configurations to users while masking sensible information like keys/tokens
config.showConfig = function showConfig() {

    let defaultProvider = conf.get('defaultProvider') || chalk.gray('Null');
    let bitlyKey = hashPartKey(conf.get('bitly_key')) || chalk.gray('Null');
    let googleKey = hashPartKey(conf.get('google_key')) || chalk.gray('Null');
    let firebaseKey = hashPartKey(conf.get('firebase_key')) || chalk.gray('Null');

    let data = {
        defaultProvider,
        bitlyKey,
        googleKey,
        firebaseKey
    };

    console.log(columnify(data, {
        minWidth: 15,
        columnSplitter: ' | '
    }));
};


// export modules
module.exports = config;
