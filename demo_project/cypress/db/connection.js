const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'dev-proxysql2.us.backendless.com:6033',
    user: 'backendlessmain',
    password: 'P*BSW:fv6{h.]$cUmain',
    database: 'main_backendless'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

const query = 'SELECT * FROM Developer';

connection.query(query, function(err, results, fields) {
    if (err) {
        console.error('Error executing query: ' + err.stack);
        return;
    }

    console.log('Query results: ', results);
});