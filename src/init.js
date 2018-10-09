/*
 * Initiate configuration, usually the first step when users start to use `surl`
 *
 */

// Dependencies
const inquirer = require('inquirer');
const chalk = require('chalk');
const Conf = require('conf');
const conf = new Conf();
const isInitCalledYet = require('./config.js').isInitCalledYet;


function inquire() {

    // init script should be allowed to run only at users' first encounter with `surl`
    if (isInitCalledYet(conf)) {
        console.log(chalk.gray(`${chalk.white('`surl init`')} should be called only the first time using surl.\n` +
            ` Please use ${chalk.white('`surl config`')} to configure your settings.`));
        return; // Exiting if init script has been called
    } else {
        console.log('Initiating configuration...');
        conf.set('init_run_time_counter', 1); // And keep executing the rest of the script
    }


    let questions = [{
            type: 'input',
            name: 'bitly_key',
            message: "Your bitly api key (or enter to skip)",
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
            message: "Your google api key (or enter to skip)",
            default: function () {
                return conf.get('google_key');
            }
        },
        {
            type: 'list',
            name: 'defaultProvider',
            message: "Finally, choose your default URL shortener api provider\n" +
                "You can change the default later with `surl config`",
            choices: ['bitly', 'firebase', 'google'],
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ];

    inquirer.prompt(questions).then(answers => {
        conf.set('bitly_key', answers.bitly_key);
        conf.set('google_key', answers.google_key);
        conf.set('firebase_key', answers.firebase_key);
        conf.set('defaultProvider', answers.defaultProvider);

        console.log('saved');
        return;
    }).catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
}


// Export module
export {
    inquire
};
