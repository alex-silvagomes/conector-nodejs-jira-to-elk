//'use strict'

var elasticsearch=require('elasticsearch');

// 'https://[username]:[password]@[server]:[port]/'
var client = new elasticsearch.Client( {  
  node: 'http://localhost:9200'
});

module.exports = client;