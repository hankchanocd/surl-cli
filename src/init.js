/* 
 * modules
 */
 const inquirer = require('inquirer');
 const Conf = require('conf');
 const conf = new Conf();

 function inquire() {
    let questions = [
    {
      type: 'list',
      name: 'provider',
      message: "Your URL shortener api provider",
      choices: ['Google', 'Bitly'],
      filter: function(val) {
        return val.toLowerCase();
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
      type: 'input',
      name: 'bitly_key',
      message: "Your bitly api key (or enter to skip)",
      default: function() {
        return conf.get('bitly_key');
      }
    }
    ];

    inquirer.prompt(questions).then(answers => {
      conf.set('provider', answers.provider);
      conf.set('google_key', answers.google_key);
      conf.set('bitly_key', answers.bitly_key);
      storeShortcutConfiguration();

      console.log('saved');
    });
  }

function storeShortcutConfiguration() {
  if (conf.get('provider') === 'google') {
    conf.set('providerUrl', 'https://www.googleapis.com/urlshortener/v1/url');
    conf.set('key', conf.get('google_key'));
  } else if (conf.get('provider') === 'bitly') {
    // To be fixed
    conf.set('providerUrl', 'https://www.googleapis.com/urlshortener/v1/url');
    conf.set('key', conf.get('bitly_key'));
  }
}

module.exports = {
  inquire
}
