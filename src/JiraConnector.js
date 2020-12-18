process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

var Client = require('node-rest-client').Client;
var jiraClient = new Client();

// Provide user credentials, which will be used to log in to JIRA.
var loginArgs = {
    data: {
        "username": "m226203",
        "password": "m226203"
    },
    headers: {
        "Content-Type": "application/json"
    }
};

jiraClient.post("https://192.168.248.85:8443/rest/auth/1/session", loginArgs, function(data, response){
    if (response.statusCode == 200) {
        console.log('succesfully logged in, session:', data.session);
        var session = data.session;
        
        // Get the session information and store it in a cookie in the header
        var searchArgs = {
            headers: {
                // Set the cookie from the session information
                cookie: session.name + '=' + session.value,
                "Content-Type": "application/json"
            },
            data: {
                // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
                jql: "type=TICKET"
            }
        };
        
        // Make the request return the search results, passing the header information including the cookie.
        jiraClient.post("https://192.168.248.85:8443/rest/api/2/search", searchArgs, function(searchResult, response) {
            console.log('status code:', response.statusCode);
            console.log('search result:', searchResult);
        });
    } else {
        throw "Login failed :(";
    }
});


module.exports = jiraClient;