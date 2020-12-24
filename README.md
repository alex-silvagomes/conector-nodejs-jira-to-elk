> https://medium.com/@webdevmark16/ingesting-real-time-data-into-elasticsearch-with-node-js-a7aa9b5acf8c
> https://www.compose.com/articles/getting-started-with-elasticsearch-and-node/

* Your data should now be ingesting automatically in real-time!

* Create index in Elastic Search (sample)
PUT earthquakes
{
  "mappings": {
    "properties": {
      "location": {
        "type": "geo_point" 
      }
    }
  }
}


** Requirements

* Setting up your Node environment
> First, install Node and npm.

* You'll need npm and the following Node modules for this walkthrough:

> elasticsearch
> get-json

* Install the modules using npm:

> npm install elasticsearch get-json  




** JiraDoc
https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/


## Chamada API
http://localhost:5011/api/data/earthquakes

## Exemplos
curl -X GET --user jira@example.com:JIRA_API_TOKEN \
   -H "Content-Type: application/json"  \
   https://your-domain.atlassian.net/rest/api/2/search?jql=assignee=matt



   TODO: Implementar CACERTS
   "start": "cross-env NODE_EXTRA_CA_CERTS=\"F:\\Desenvolvedor\\CACERTS\\intermediate.pem\" node index.js",



https://confluence.atlassian.com/cloud/api-tokens-938839638.html
   curl -v https://mysite.atlassian.net --user me@example.com:my-api-token




   