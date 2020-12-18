const request = require('request-promise');

var basicAuth = 'Basic ' + Buffer.from('m226203:m226203').toString('base64');


let options = {
                json: true,
                uri : "https://192.168.248.85:8443/rest/api/2/project",
                rejectUnauthorized: false, // This doesn't work
                auth : basicAuth
            };

let response = request.get(options)

console.log(response)