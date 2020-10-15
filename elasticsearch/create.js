import { indices } from './connection.js';

indices.create({  
  index: 'earthquakes'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("create",resp);
  }
});