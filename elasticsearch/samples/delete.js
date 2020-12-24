import { indices } from './connection.js';

indices.delete({index: 'earthquakes'},function(err,resp,status) {  
  console.log("delete",resp);
});