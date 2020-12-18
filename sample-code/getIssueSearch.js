// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

var basicAuth = 'Basic ' + Buffer.from('m226203:m226203').toString('base64');

//var URIPath ="https:/192.168.248.85:8443/rest/api/2/search?" + encodeURIComponent("jql=issuetype=Ticket")

// var options = {
//   protocol: "https:",
//   hostname: "192.168.248.85",
//   port: 8443,
//   path: URIPath,
//   auth: basicAuth
// }


fetch('https://192.168.248.85:8443/rest/api/2/project')
    .then(res => res.json())
    .then(json => {
        console.log("First user in the array:");
        console.log(json[0]);
        console.log("Name of the first user in the array:");
        console.log(json[0].name);
})