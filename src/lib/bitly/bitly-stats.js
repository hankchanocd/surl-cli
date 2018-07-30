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
    console.log(`${chalk.grey('days ago:')}`);
    let counter = 0;
    response.clicksByDay.forEach(obj => {
        console.log(`  ${counter} days ago: ${obj.clicks} clicks`);
        counter++;
    });
    console.log(`${chalk.grey('countries:')}`);
    response.clicksByCountry.forEach(obj => {
        console.log(`  ${obj.country}: ${obj.clicks}`);
    });

}

function parseSummary(summary) {
    let info = summary[0];
    let longUrl = summary[1];
    let clicks = summary[2];
    let clicksByDay = summary[3];
    let clicksByCountry = summary[4];

    let title = info.info[0].title;
    let shortUrl = clicks.clicks[0].short_url; 
    longUrl = longUrl.expand[0].long_url; 
    let userClicks = clicks.clicks[0].user_clicks; 
    let globalClicks = clicks.clicks[0].global_clicks; 
    clicksByDay = clicksByDay.clicks_by_day[0].clicks; 
    clicksByCountry = clicksByCountry.countries;


    return { title, shortUrl, longUrl, userClicks, globalClicks, clicksByDay, clicksByCountry };
}


// Export 
export {
    summary,
    parseSummary
};
