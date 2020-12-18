const fetch = require('node-fetch');
var config = require('../config');
var url = config.jira.url;
var username = config.jira.username;
var password = config.jira.password;
var request = require('request');



var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
var headers = {'Authorization': auth};
const options = {
    'auth': {
      'user': username,
      'pass': password
    }
};

// JIRA issues
function getIssue(id) {
    let _resolve, _reject;
    let promise = new Promise((resolve, reject) => { _reject = reject; _resolve = resolve; });
    request(`${config.jira.url}/rest/api/latest/issue/${id}`, options, 
    function (error, response, body) {
        if(response && response.statusCode >= 200 && response.statusCode <= 300){
            _resolve(JSON.parse(body))
        }else{
            _reject(error)
        }
    });
    return promise;
}

function assignIssue(issueId, user){

}

function createIssue(title, description, type){
    console.log(`jiraConnector createIssue`);
    let _resolve, _reject;
    let promise = new Promise((resolve, reject) => { _reject = reject; _resolve = resolve; });
    let issueType = type;
    if(!issueType){
        issueType = config.jira.issueTypes.story;
    }else{
        issueType = config.jira.issueTypes[type];
    }
    let postData = {
        "fields": {
            "project": {
                "id": config.jira.defaultProjectId
            },
            "summary": title,
            "issuetype": {
                "id": issueType
            },
            "description": description
        }
    }
    let requestOptions = {...options, method: 'post', body: postData, json: true};
    request.post(`${config.jira.url}/rest/api/latest/issue`, requestOptions, 
    function (error, response, body) {
        //console.log(`response`, response);
        console.log(`body`, body);
        console.log(`error`, error);
        if(response && response.statusCode >= 200 && response.statusCode <= 300){
            _resolve(body)
        }else{
            _reject(JSON.stringify(body))
        }
    });
    return promise;
}

function assignIssue(issueId, userId){
    console.log(`jiraConnector assignIssue`);
    let _resolve, _reject;
    let promise = new Promise((resolve, reject) => { _reject = reject; _resolve = resolve; });
    let postData = {
        "name": userId
    }
    let requestOptions = {...options, method: 'put', body: postData, json: true};
    request.put(`${config.jira.url}/rest/api/latest/issue/${issueId}/assignee`, requestOptions, 
    function (error, response, body) {
        //console.log(`response`, response);
        console.log(`body`, body);
        console.log(`error`, error);
        if(response && response.statusCode >= 200 && response.statusCode <= 300){
            _resolve('assigned successfully')
        }else{
            _reject(JSON.stringify(body))
        }
    });
    return promise;
}


function getAllBoards(){
    console.log(`jiraConnector getAllBoards`);
    let _resolve, _reject;
    let promise = new Promise((resolve, reject) => { _reject = reject; _resolve = resolve; });
    request.get(`${config.jira.url}/rest/agile/1.0/board`, {options, json: true}, 
    function (error, response, body) {
        //console.log(`response`, response);
        console.log(`body`, body);
        console.log(`error`, error);
        if(response && response.statusCode >= 200 && response.statusCode <= 300){
            _resolve(body);
        }else{
            _reject(JSON.stringify(body))
        }
    });
    return promise;
}

function getSprintsFromBoard(boardId){
    console.log(`jiraConnector getAllBoards`);
    let _resolve, _reject;
    let promise = new Promise((resolve, reject) => { _reject = reject; _resolve = resolve; });
    request.get(`${config.jira.url}/rest/agile/1.0/board/${boardId}/sprint`, {...options, json: true}, 
    function (error, response, body) {
        //console.log(`response`, response);
        console.log(`body`, body);
        console.log(`error`, error);
        if(response && response.statusCode >= 200 && response.statusCode <= 300){
            _resolve(body);
        }else{
            _reject(JSON.stringify(body))
        }
    });
    return promise;
}

function assignIssueToSprint(issueId, sprintId){
    console.log(`jiraConnector createIssue`);
    let _resolve, _reject;
    let promise = new Promise((resolve, reject) => { _reject = reject; _resolve = resolve; });
    
    let postData = {
        "issues": [
            issueId
        ]
    }
    let requestOptions = {...options, method: 'post', body: postData, json: true};
    request.post(`${config.jira.url}/rest/agile/1.0/sprint/${sprintId}/issue`, requestOptions, 
    function (error, response, body) {
        //console.log(`response`, response);
        console.log(`body`, body);
        console.log(`error`, error);
        if(response && response.statusCode >= 200 && response.statusCode <= 300){
            _resolve('assigned successfully');
        }else{
            _reject(JSON.stringify(body))
        }
    });
    return promise;
}

module.exports = {
    getIssue: getIssue,
    createIssue: createIssue,
    assignIssue: assignIssue,
    getAllBoards: getAllBoards,
    getSprintsFromBoard: getSprintsFromBoard,
    assignIssueToSprint: assignIssueToSprint,
    getAllIssuesProject: getAllIssuesProject
};