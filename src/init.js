/*
 * Initiate configuration, usually the first step when users start to use `surl`
 *
 */

// Dependencies
const inquirer = require('inquirer');
const Conf = require('conf');
const conf = new Conf();
const storeDefaultConfiguration = require('./config.js').storeDefaultConfiguration;


function inquire() {
    let questions = [{
            type: 'input',
            name: 'bitly_key',
            message: "Your bitly api key (or enter to skip)",
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
            message: "Your google api key (or enter to skip)",
            default: function() {
                return conf.get('google_key');
            }
        },
        {
            type: 'list',
            name: 'provider',
            message: "Finally, choose your default URL shortener api provider\n" +
                "You can change the default later with `surl config`",
            choices: ['bitly', 'firebase', 'google'],
            filter: function(val) {
                return val.toLowerCase();
            }
        }
    ];

    inquirer.prompt(questions).then(answers => {
        conf.set('bitly_key', answers.bitly_key);
        conf.set('google_key', answers.google_key);
        conf.set('firebase_key', answers.firebase_key);
        conf.set('defaultProvider', answers.defaultProvider);

        storeDefaultConfiguration();

        console.log('saved');
    });
}


// Export module
export {
    inquire
};
