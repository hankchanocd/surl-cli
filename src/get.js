/*
 * modules
 */
 const chalk = require('chalk');
 const fetch = require('fetch').fetchUrl;
 const Conf = require('conf');
 const copy = require('clipboardy').writeSync;
 const columnify = require('columnify');
 const ui = require('cliui')();

// Retrieve data from configurations for accessing the preferred API provider
const conf = new Conf();
const apiKey = conf.get('key');
const url = conf.get('providerUrl');


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

    // Copy to clipboard
    copy(response.longUrl);
    console.log(`${chalk.green('success! expanded url copied to clipboard ')}`);
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

      // Copy to clipboard
      copy(response.id);
      console.log(`${chalk.green('success! ' + chalk.white.underline(response.id) + ' copied to clipboard')}`);
    });
  
}

function stats(input) {
  input += '&projection=FULL'; // stats identifier
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

    // Display analytics
    console.log(`${chalk.grey('shortUrl:')} ${response.id}`);
    console.log(`${chalk.grey('origin:')} ${response.longUrl}`);
    console.log(`${chalk.grey('created:')} ${fullDate(response.created)}`);
    console.log(`${chalk.grey('clicks:')}`);
    console.log(summary(response.analytics));
  });
}


// Helper methods

function fullDate(date) {
  let d = new Date(date);
  return d.getFullYear() + ' ' + d.getMonth() + ' ' + d.getDate();
}

// Clicks summary
function summary(analytics) {
  ui.div({
    text: clicksPeriod(analytics),
    width: 35,
    padding: [0, 4, 0, 4]
  },{
    text: clicksCountries(analytics),
    width: 25,
    padding: [0, 4, 0, 4]
  });
  return ui.toString();
}

function clicksPeriod(analytics) {
  let period = [{
    period: 'allTime',
    shortUrl: analytics.allTime.shortUrlClicks,
    longUrl: analytics.allTime.longUrlClicks
  }, {
    period: 'month',
    shortUrl: analytics.month.shortUrlClicks,
    longUrl: analytics.month.longUrlClicks
  }, {
    period: 'week',
    shortUrl: analytics.week.shortUrlClicks,
    longUrl: analytics.week.longUrlClicks
  }, {
    period: 'day',
    shortUrl: analytics.day.shortUrlClicks,
    longUrl: analytics.day.longUrlClicks
  }, {
    period: 'twoHours',
    shortUrl: analytics.twoHours.shortUrlClicks,
    longUrl: analytics.twoHours.longUrlClicks
  }];

  return columnify(period);
}

function clicksCountries(analytics) {
  let countries = analytics.allTime.countries;
  countries = countries.map((obj) => {return {countries: obj.id, count: obj.count}});
  return columnify(countries);
}


export {
  expandUrl,
  shortenUrl,
  stats
};
