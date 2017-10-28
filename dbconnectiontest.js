var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'r1r2r3',
    port     : '3306',
    database : 'study_jsp'
  });
  connection.connect();
  
  connection.query('SELECT * from user_info', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.', err);
  });
  
  connection.end();