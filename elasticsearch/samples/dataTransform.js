
async function run(objectResults, callback) {

    var dateNow = dateFormat(new Date(), "%Y-%m-%d", true)
    var indexName = `tickets-${dateNow}`

    const transformResults = [{
        id: 1,
        text: 'If I fall, don\'t bring me back.',
        user: 'jon',
        date: new Date()
      }, {
        id: 2,
        text: 'Winter is coming',
        user: 'ned',
        date: new Date()
      }, {
        id: 3,
        text: 'A Lannister always pays his debts.',
        user: 'tyrion',
        date: new Date()
      }, {
        id: 4,
        text: 'I am the blood of the dragon.',
        user: 'daenerys',
        date: new Date()
      }, {
        id: 5, // change this value to a string to see the bulk response with errors
        text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
        user: 'arya',
        date: new Date()
      }]

      var indexObjetcRequest
      objectResults.map(async objectResults => (
        indexObjetcRequest = {
            id: results.id
        }
    ));

     callback(transformResults)

}


function dateFormat(date, fstr, utc) {
    utc = utc ? 'getUTC' : 'get';
    return fstr.replace(/%[YmdHMS]/g, function (m) {
        switch (m) {
            case '%Y': return date[utc + 'FullYear'](); // no leading zeros required
            case '%m': m = 1 + date[utc + 'Month'](); break;
            case '%d': m = date[utc + 'Date'](); break;
            case '%H': m = date[utc + 'Hours'](); break;
            case '%M': m = date[utc + 'Minutes'](); break;
            case '%S': m = date[utc + 'Seconds'](); break;
            default: return m.slice(1); // unknown code, remove %
        }
        // add leading zero if required
        return ('0' + m).slice(-2);
    });
}

module.exports = {
    dataTransform: run
}