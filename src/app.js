// 'use strict'
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const jiraConnector = new require('./JiraConnector');
const indexBulk = new require('../elasticsearch/indexBulk');


console.log('Loading ./JiraConnector')

callJiraConnector(function (status_code, status_message, dataset) {

    if (status_code == 200) {
        console.log("CONNECTED:", status_code)
    } else {
        throw `status_code: ${status_code} - ${status_message}`
    }
});

async function callJiraConnector(callback) {
    var status_code
    var status_message

    // GetIssuesFromProject:
    await jiraConnector.jiraGetIssuesFromProject().then((result) => {
        status_code = result.statusCode
        status_message = result.statusMessage
        
        callback(status_code, status_message, dataset);

    }).catch((reject) => {
        status_code = reject.statusCode
        status_message = reject.errorMessages
        console.log("ERROR:",status_code,status_message)
        callback(status_code, status_message, dataset);
    });

}

async function callJiraGetIssuesFromProject(startAt, maxResults, callback) {
    var status_code
    var status_message
    var error_message

    await jiraConnector.jiraGetIssuesFromProject(cookieLogged, startAt, maxResults).then((result) => {
        status_code = result.statusCode
        status_message = result.statusMessage

        callback(status_code, status_message, result);


    }).catch((reject) => {
        status_code = reject.statusCode
        status_message = reject.errorMessages

        callback(status_code, status_message, result);
    });

}

async function callIndexToELK(results, callback) {
    var responseELK

    indexBulk.bulkInsert(results, function (bulkResponse) {
        
         
        console.log(bulkResponse)
        if (!bulkResponse.errors){
            callback(`Index ES atualizado com sucesso (${bulkResponse.items.length})`);
        }else{
            callback(`Index ES com erro: `);
        }
    
        

    });

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

console.log('Preparing For The Next Data Check...');

