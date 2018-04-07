/*
 * modules
 */
const chalk = require('chalk');

// Include data for accessing Google APIs
const apiKey = 'AIzaSyDtgAbFDs8HctoY1GMqe9s8CEPb86_Mlg8';
const url = 'https://www.googleapis.com/urlshortener/v1/url';

// AJAX functions using features from SE7 SE8
async function expandUrl(input) {
  const urlToExpand = url + '?shortUrl=' + input + '&key=' + apiKey;
  try {
    let response = await fetch(urlToExpand);
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse.longUrl;
    }
  } catch (error) {
    console.log(chalk.redBright(error));
}
}

async function shortenUrl(input) {
  const urlWithKey = url + '?key=' + apiKey;
  try {
    let response = 
        await fetch(urlWithKey, 
                    {method: 'POST', 
                     body: JSON.stringify({longUrl: urlToShorten}),
                    headers: {'Content-type': 'application/json'}});
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse.id;
    }
  } catch (error) {
    console.log(chalk.redBright(error));
  }
}

module.exports = {
  expandUrl: expandUrl,
  shortenUrl: shortenUrl
}
