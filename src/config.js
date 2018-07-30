/*
 * Configuration
 */

// Dependencies
const inquirer = require('inquirer');
const Conf = require('conf');
const conf = new Conf();


function inquire() {
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
        conf.set('google_key', answers.google_key);

        storeDefaultConfiguration();

        console.log('saved');
    });
}

// Store the default API provider and its corresponding key/token
function storeDefaultConfiguration() {
    switch (conf.get('defaultProvider')) {
        case 'bitly':
            conf.set('key', conf.get('bitly_key'));
            return;
        case 'google':
            conf.set('key', conf.get('google_key'));
            return;
        default:
            return;
    }
}


// export modules
export {
    inquire,
    storeDefaultConfiguration
};
