process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');


const bodyData = `{
  "jqls": [
    "project = TICKET",
    "issuetype = TICKET"
  ]
}`;

fetch('https://192.168.248.85:8443/rest/api/2/jql/match', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from('m226203:134175').toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  strictSSL: false,
  //requestCert: false,
  //rejectUnauthorized: false,
  body: bodyData
})
  .then(response => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    return response.text();
  })
  .then(text => {
    console.log(text)
  })
  .catch(err => {
    console.error(err)
  });