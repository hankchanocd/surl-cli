/*
 * modules
 */
const inquirer = require('inquirer');
const Conf = require('conf');
const conf = new Conf();
const { storeDefaultConfiguration } = require('config.js');


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
            choices: ['bitly', 'firebase', 'owly', 'google'],
            filter: function(val) {
                return val.toLowerCase();
            }
        }
    ];

    inquirer.prompt(questions).then(answers => {
        conf.set('bitly_key', answers.bitly_key);
        conf.set('google_key', answers.google_key);
        conf.set('defaultProvider', answers.defaultProvider);

        storeDefaultConfiguration();

        console.log('saved');
    });
}


// Export module
export {
    inquire
};
