const getQueryCount = (query) => {
    let str = '';
    query.forEach(item => {
        str += '?';
    })
    return str.split('').join(',');
}

module.exports = getQueryCount;

