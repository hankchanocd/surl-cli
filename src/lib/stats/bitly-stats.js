/* 
 * Utility library for displaying statistics from bitly URL shortener API
 * 
 */

// Dependencies
const chalk = require('chalk');


// summary
function summary(response) {
    let info = response[0];
    let longUrl = response[1];
    let clicks = response[2];
    let clicksByDay = response[3];
    let clicksByCountry = response[4];

    console.log(`${chalk.grey('title:')} ${info.info[0].title}`);
    console.log(`${chalk.grey('short url:')} ${clicks.clicks[0].short_url}`);
    console.log(`${chalk.grey('long url:')} ${longUrl.expand[0].long_url}`);
    console.log(`${chalk.grey('user clicks:')} ${clicks.clicks[0].user_clicks}`);
    console.log(`${chalk.grey('global clicks:')} ${clicks.clicks[0].global_clicks}`);
    console.log(`${chalk.grey('days ago:')}`);
    let counter = 0;
    clicksByDay.clicks_by_day[0].clicks.forEach(obj => {
        console.log(`  ${counter} days ago: ${obj.clicks} clicks`);
        counter++;
    });
    console.log(`${chalk.grey('countries:')}`);
    clicksByCountry.countries.forEach(obj => {
        console.log(`  ${obj.country}: ${obj.clicks}`);
    });

}


// Export 
export {
    summary
};
