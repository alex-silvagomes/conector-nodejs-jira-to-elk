process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

var Client = require('node-rest-client').Client;
var jiraClient = new Client();
const config = require('./config');

async function jiraConnectByCookie(){
    
    console.log("")
    return new Promise((result, reject) => {

        // Provide user credentials, which will be used to log in to JIRA.
        var loginArgs = {
            data: {
                "username": config.jira.username,
                "password": config.jira.password
            },
            headers: {
                "Content-Type": "application/json"
            }
        };

        
        // https://<HOST>:<PORT>/rest/auth/1/session
        jiraClient.post(`${config.jira.url}/rest/auth/1/session`, loginArgs, function(data, response){
            
            data.statusCode = response.statusCode
            data.statusMessage = response.statusMessage

            if (data.statusCode == 200) {
                console.log('succesfully logged in, session:', data.session);
                               
                result(data)

            } else {
                reject(data);
            }
        });

    });    
}


async function searchIssues (pCookieLogged, pStartAt){
    
    return new Promise((result, reject) => {

        // Get the session information and store it in a cookie in the header
        var searchArgs = {
            headers: {
                // Set the cookie from the session information
                cookie: pCookieLogged.name + '=' + pCookieLogged.value,
                "Content-Type": "application/json"
            },
            data: {
                // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
                jql: "type=TICKET",
                maxResults: 1000,
                startAt: pStartAt,                
                fields: [
                    "*all"
                ]
            }
        };   
        
        let URL = `${config.jira.url}/rest/api/2/search`
        
        jiraClient.post(`${URL}`, searchArgs, function(searchResult, response) {
            console.log('status code:', response.statusCode);
            searchResult.statusCode = response.statusCode
            searchResult.statusMessage = response.statusMessage

            // Make the request return the search results, passing the header information including the cookie.
            
            if (response.statusCode == 200){
                console.log('search result:', searchResult);
                result(searchResult)
            }else{
                reject(response)
            }
        });  
    }); 
}

module.exports = {
    jiraConnectByCookie : jiraConnectByCookie,
    searchIssues : searchIssues
}