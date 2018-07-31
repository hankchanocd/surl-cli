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
        return NaN;
    }

    let d = new Date(date);
    return d.getFullYear() + ' ' + (d.getMonth() + 1) + ' ' + d.getDate();
}


// Export methods
export {
    identifyAPIProvider,
    fullDate
};
