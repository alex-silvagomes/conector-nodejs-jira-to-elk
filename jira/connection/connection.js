
// ES5
var JiraClient = require("jira-connector");
 
// ES6 or Typescript
//import JiraClient from "jira-connector";
 
// Initialize
var jira = new JiraClient({
  protocol: 'https',
  host: 'jira.bradesco.com.br',
  port: 8443,
  basic_auth: {
    email: "alex.gomes@inmetrics.com.br",
    username: "m226103",
    api_token: "m226103"
  },
  apiVersion: '2',
  strictSSL: false
});

module.exports = jira;


