/*
 * Configuration
 */

// Dependencies
const inquirer = require('inquirer');
const chalk = require('chalk');
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
            filter: function(val) {
                return val.toLowerCase();
            }
        },
        {
            type: 'input',
            name: 'bitly_key',
            message: "Modify your bitly api key",
            default: function() {
                return conf.get('bitly_key');
            }
        },
        {
            type: 'input',
            name: 'firebase_key',
            message: "Your firebase api key (or enter to skip)",
            default: function() {
                return conf.get('firebase_key');
            }
        },
        {
            type: 'input',
            name: 'google_key',
            message: "Modify your google api key",
            default: function() {
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
    });
};


// Check to see if init script is being called the first time
config.isInitCalledYet = function isInitCalledYet (conf) {

    if (conf.get('init_run_time_counter')) {
        return true;
    } else {
        return false;
    }
}


// export modules
module.exports = config;
