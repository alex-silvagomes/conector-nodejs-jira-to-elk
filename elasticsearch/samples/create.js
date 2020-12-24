import { indices } from './connection.js';



indices.create({  
  index: 'tickets'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("create",resp);
  }
});