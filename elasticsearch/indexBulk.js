
const clientELK = require('./connection/connection');
const { createReadStream } = require('fs')
const split = require('split2')
const jiraConfig = require('../src/config');

async function bulkInsert(objectResults, callback) {

    var dateNow = new Date()
    var dateNowStr = dateFormat(dateNow, "%Y-%m-%d", true)   
    
    var extractDate = dateNowStr //new Date().toGMTString() //Date.UTC(dateNow.getFullYear(), mês, dia, 0, 0, 0, 0)
    //var indexName = `tickets-jira-${dateNowStr}`
    var indexName = `tickets-jira`
    var indexType = `devops-analytics`

   
    var indexDocument = [];

    for (const item of objectResults) {
        
        
        let created_date = new Date(item.fields.created);
        let updated_date = new Date(item.fields.updated);
        let cycle_time_in_minutes = 0
        let InstaladoProducao = item.fields.customfield_11825
        let UrlJiraTicket = `${jiraConfig.jira.url}/browse/${item.key}`  
        
        // let changelog = item.changelog.histories
        if (InstaladoProducao && InstaladoProducao.value.includes("Sim")){
            cycle_time_in_minutes = diff_minutes(created_date, updated_date)
        }

        // let errorsCount = 0
        // for (const changelogItem of changelog) {
        //     errorsCount += changelogItem 
        //     changelogItem.filter(x => x.name.includes('RC'))
        // }

        var incrementDocument = {
            doc_as_upsert: true,
            "extractDate" : extractDate,
            "projectName": item.fields.project,
            "summary": item.summary,
            "id": parseInt(item.id),
            "key": item.key,
            "self": item.self,
            "UrlJiraTicket": UrlJiraTicket,
            "created": created_date,
            "creator": item.fields.creator,
            "updated": updated_date,
            "fields": {
                "Status": item.fields.status.name,
                "Pipeline": item.fields.customfield_11801,
                "PacoteChangeman": item.fields.customfield_11805,
                "CentroDeCusto": item.fields.customfield_11807,
                "TipoMudanca": item.fields.customfield_11803,
                "RDMNumber": item.fields.customfield_11800,
                "NumeroSequenciaPPMC": item.fields.customfield_12203,
                "Ambiente": item.fields.customfield_11818,
                "InstaladoTU": item.fields.customfield_11826,
                "InstaladoTI": item.fields.customfield_11828,
                "InstaladoAntigoTI": item.fields.customfield_11824,
                "InstaladoTH": item.fields.customfield_11827,
                "InstaladoProducao": InstaladoProducao                 
            },
            "metrics": {
                "cycle_time_in_minutes": cycle_time_in_minutes
            }
        }
        //transitions[0].name.includes("CANCELAR TE")

        var jsonStr = JSON.stringify(incrementDocument)
        indexDocument.push({ "index" : { "_index" : indexName, "_type" : indexType, "_id" : parseInt(item.id)}})
        indexDocument.push(JSON.parse(jsonStr))
    }

    var indexDocumentStr = JSON.stringify(indexDocument)

   
    //const body = indexDocument.flatMap(doc => [{ index: { _index: indexName} }, doc])
    
    var BulkIndexDocumentsParams = {
        //index: indexName,
        //type: 'devops-analytics',
        //wait_for_active_shards: 'all',
        //refresh: true,
        //pipeline: 'dataops-esteira-unificada',
        //require_alias: true,
        body: indexDocument
    }

    const { body: bulkResponse } = await clientELK.bulk(BulkIndexDocumentsParams)

    if (bulkResponse.errors) {
        const erroredDocuments = []
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
            const operation = Object.keys(action)[0]
            if (action[operation].error) {
                erroredDocuments.push({
                    // If the status is 429 it means that you can retry the document,
                    // otherwise it's very likely a mapping error, and you should
                    // fix the document before to try it again.
                    status: action[operation].status,
                    error: action[operation].error,
                    operation: body[i * 2],
                    document: body[i * 2 + 1]
                })
            }
        })
        console.log(erroredDocuments)
    }else{

    }

    const { body: transationResponse } = await clientELK.count({ index: indexName })
    console.log(transationResponse)

    clientELK.close();
    console.log('Elastic Search Client: BulkInsert (', bulkResponse.items.length, ')');

    callback(bulkResponse)
 
    

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

function diff_minutes(startDate, endDate) {

  var diff = ( endDate.getTime() - startDate.getTime() ) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
  
}

module.exports = {
    bulkInsert: bulkInsert
}