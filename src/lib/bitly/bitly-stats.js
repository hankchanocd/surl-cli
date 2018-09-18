/*
 * Utility library for displaying statistics from bitly URL shortener API
 *
 */

// Dependencies
const chalk = require('chalk');


// summary
function summary(response) {

    // Parse the incoming summary to digestable info array
    response = parseSummary(response);

    console.log(`${chalk.grey('title:')} ${response.title}`);
    console.log(`${chalk.grey('short url:')} ${response.shortUrl}`);
    console.log(`${chalk.grey('long url:')} ${response.longUrl}`);
    console.log(`${chalk.grey('user clicks:')} ${response.userClicks}`);
    console.log(`${chalk.grey('global clicks:')} ${response.globalClicks}`);

    let counter = 0;
    if (response.hasOwnProperty('clicksByDay')) {
        console.log(`${chalk.grey('days ago:')}`);
        response.clicksByDay.forEach(obj => {
            console.log(`  ${counter} days ago: ${obj.clicks} clicks`);
            counter++;
        });
    }

    if (response.hasOwnProperty('clicksByCountry')) {
        console.log(`${chalk.grey('countries:')}`);
        response.clicksByCountry.forEach(obj => {
            console.log(`  ${obj.country}: ${obj.clicks}`);
        });
    }

}


// Parse summary into digestable format for UI as well as testing
function parseSummary(summary) {

    let [info, longUrl, clicks, clicksByDay, clicksByCountry] = summary,
        title = '',
        shortUrl = '',
        userClicks = 0,
        globalClicks = 0;

    try {
        title = info.info[0].title || chalk.grey('Null');
        shortUrl = clicks.clicks[0].short_url || chalk.grey('Null');
        longUrl = longUrl.expand[0].long_url || chalk.grey('Null');
        userClicks = clicks.clicks[0].user_clicks !== 'undefined' ? clicks.clicks[0].user_clicks : 0; // Defend in case API response is currupted
        globalClicks = clicks.clicks[0].global_clicks !== 'undefined' ? clicks.clicks[0].global_clicks : 0;
        clicksByDay = clicksByDay.clicks_by_day[0].clicks || [];
        clicksByCountry = clicksByCountry.countries || [];

    } catch (err) {
        console.log(chalk.redBright(`Parsing summary failed: ${err}`));
    }


    return {
        title,
        shortUrl,
        longUrl,
        userClicks,
        globalClicks,
        clicksByDay,
        clicksByCountry
    };
}


// Export
export {
    summary,
    parseSummary
};
