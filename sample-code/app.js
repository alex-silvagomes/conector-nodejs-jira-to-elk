//require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

var http = require('http');

var basicAuth = 'Basic ' + Buffer.from('m226203:m226203').toString('base64');

var URIPath ="/rest/api/2/search?" + encodeURIComponent("jql=issuetype=Ticket")

var options = {
  protocol: "http:",
  hostname: "192.168.248.85",
  port: 8443,
  path: URIPath,
  auth: basicAuth
}
try {
  var request = http.get(options, function (res) {
    res.setEncoding('utf8');
    var body = '';
  
    res.on('data', function (chunk) {
      body += chunk;
    });
  
    res.on('end', function () {
      console.log(body);
      var jsonData = JSON.parse(body);
    });
  
  }).on('error', function (e) {
    console.log("Error: ", e);
  });
} catch (error) {
  console.log("Error: ", error);
}
