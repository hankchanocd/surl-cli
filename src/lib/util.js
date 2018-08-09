/*
 * Utility methods
 *
 */

// Dependencies


// Identify API provider
function identifyAPIProvider(url) {

    if (url.includes('://bit.ly/')) {
        return 'bitly';
    } else if (url.includes('://goo.gl/')) {
        return 'google';
    } else {
        return '';
    }
}


// Get full date
function fullDate(date) {
    if (typeof date !== 'number' && typeof date !== 'string') {
        return undefined;
    }

    let d = new Date(date);
    return d.getFullYear() + ' ' + (d.getMonth() + 1) + ' ' + d.getDate();
}


// Partly hashed key is used to for config display
function hashPartKey(key) {

    if (typeof (key) === 'undefined' || (!typeof (key) === 'string' && !typeof (key) === 'number')) {
        return;
    }
    key = key.toString();

    if (key === '') {
        return;
    }

    let firstDigit = key[0];
    let lastDigit = key[key.length - 1];

    return firstDigit + 'xxxxx' + lastDigit;
}


// Export methods
export {
    identifyAPIProvider,
    fullDate,
    hashPartKey
};
