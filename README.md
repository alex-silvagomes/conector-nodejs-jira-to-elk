** Requirements

* Setting up your Node environment
> First, install Node and npm.

* You'll need npm and the following Node modules for this walkthrough:


# PACKAGE.json

* Install the modules using npm:

> npm install <dependencies> 

{
  "dependencies": {
    "@elastic/elasticsearch": "^7.10.0",
    "array.prototype.flatmap": "^1.2.4",
    "node-rest-client": "^1.4.4",
    "split2": "^3.2.2"
  },
  "name": "conector-pipeline-devops-nodejs"
}


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




   