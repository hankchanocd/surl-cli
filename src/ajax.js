/*
 * modules
 */
 const chalk = require('chalk');
 const fetch = require('fetch').fetchUrl;
 const copy = require('clipboardy').writeSync;

// Include data for accessing Google APIs
const apiKey = 'AIzaSyDtgAbFDs8HctoY1GMqe9s8CEPb86_Mlg8';
const url = 'https://www.googleapis.com/urlshortener/v1/url';

// Include data for accessing Bitly APIs


// AJAX functions using features from SE7 SE8
function expandUrl(input) {
  const urlToExpand = url + '?shortUrl=' + input + '&key=' + apiKey;
  fetch(urlToExpand, function(error, meta, body){

    // Should a network error happen
    if (error) {
      return console.log(chalk.redBright('ERROR:', error.message || error));
    }

    let response = JSON.parse(body);

    // Should a invalid url is sent
    if (response.error) {
      return console.log(chalk.redBright('ERROR:', response.error.message));
    }

    copy(response.longUrl);
    console.log(`${chalk.blueBright('success! expanded url copied to clipboard ')}`);
  });

}

function shortenUrl(input) {
  const urlWithKey = url + '?key=' + apiKey;
  fetch(urlWithKey, 
    {method: 'POST', 
    payload: JSON.stringify({longUrl: input}),  // payload is body for options in fetch()
    headers: {'Content-type': 'application/json'}},
    function(error, meta, body){

      // Should a network error happen
      if (error) {
        return console.log(chalk.redBright('ERROR:', error.message || error));
      }

      let response = JSON.parse(body);

      // Should a invalid url is sent
      if (response.error) {
        return console.log(chalk.redBright('ERROR:', response.error.message));
      }

      copy(response.id);
      console.log(`${chalk.blueBright('success! shortened url copied to clipboard')}`);
    });
  
}

module.exports = {
  expandUrl: expandUrl,
  shortenUrl: shortenUrl
}
