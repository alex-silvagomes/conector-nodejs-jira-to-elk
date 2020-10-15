const express = require('express');
const router = express.Router();

var client = require('../../elasticsearch/connection/connection.js');

//================== Official API Call ==================\\
router.get('/health', async function (req, res) {

  client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
    res.json(resp)
  });

  // client.count({index: 'gov',type: 'constituencies'},function(err,resp,status) {  
  //   console.log("constituencies",resp);
  // });


});
 
module.exports = router;