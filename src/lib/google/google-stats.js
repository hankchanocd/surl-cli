/*
 * Utility library for displaying statistics from google URL shortener API
 *
 */

// Dependencies
const util = require('../util.js');

// UI
const chalk = require('chalk');
const columnify = require('columnify');
const ui = require('cliui')();


// Clicks summary
function summary(response) {

    response = parseSummary(response);

    console.log(`${chalk.grey('shortUrl:')} ${response.shortUrl}`);
    console.log(`${chalk.grey('origin:')} ${response.longUrl}`);
    console.log(`${chalk.grey('created:')} ${response.date}`);
    console.log(`${chalk.grey('clicks:')}`);

    // Clicks details
    if (!response.analytics) {
        console.log(chalk.grey('clicks data NaN'));
    } else {
        ui.div({
            text: clicksPeriodUI(response.analytics),
            width: 35,
            padding: [0, 4, 0, 4]
        }, {
            text: clicksCountriesUI(response.analytics),
            width: 25,
            padding: [0, 4, 0, 4]
        });

        console.log(ui.toString());
    }
}


// Parse summary into digestable format for UI as well as for testing
function parseSummary(summary) {
    return {
        shortUrl: summary.id || chalk.gray('NaN'),
        longUrl: summary.longUrl || chalk.gray('NaN'),
        date: util.fullDate(summary.created) || chalk.gray('NaN'),
        analytics: summary.hasOwnProperty('analytics') ? summary.analytics : false
    };
}


function clicksPeriodUI(analytics) {

    if (!analytics.hasOwnProperty('allTime') || !analytics.hasOwnProperty('month') ||
     !analytics.hasOwnProperty('week') || !analytics.hasOwnProperty('day') ||
     !analytics.hasOwnProperty('twoHours')) {
        return '';
    }

    let period = [{
        period: 'allTime',
        shortUrl: analytics.allTime.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.allTime.longUrlClicks || chalk.grey('NaN')
    }, {
        period: 'month',
        shortUrl: analytics.month.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.month.longUrlClicks || chalk.grey('NaN')
    }, {
        period: 'week',
        shortUrl: analytics.week.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.week.longUrlClicks || chalk.grey('NaN')
    }, {
        period: 'day',
        shortUrl: analytics.day.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.day.longUrlClicks || chalk.grey('NaN')
    }, {
        period: 'twoHours',
        shortUrl: analytics.twoHours.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.twoHours.longUrlClicks || chalk.grey('NaN')
    }];

    return columnify(period);
}


function clicksCountriesUI(analytics) {

    try {
        let countries = analytics.allTime.countries;

        countries = countries.map((obj) => {
            return {
                countries: obj.id,
                count: obj.count
            };
        });
        return columnify(countries);
        
    } catch (err) {
        return chalk.grey('COUNTRIES DATA NaN');
    }
}


// Export
export {
    summary,
    parseSummary,
    clicksPeriodUI,
    clicksCountriesUI
};
