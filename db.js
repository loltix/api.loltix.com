const mariadb = require('mariadb');
var bodyParser = require('body-parser');
const pool = mariadb.createPool({
     host: 'loltix.com', 
     user:'loltixread', 
     password: 'AlexChad2020!',
     database:'loltix',
     connectionLimit: 5
});

module.exports={
  getConnection: function(){
    return new Promise(function(resolve,reject){
      pool.getConnection().then(function(connection){
        resolve(connection);
      }).catch(function(error){
        reject(error);
      });
    });
  }
}; 