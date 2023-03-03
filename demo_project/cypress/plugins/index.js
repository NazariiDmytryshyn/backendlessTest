// In your cypress/plugins/index.js file
const fetch = require("node-fetch");

module.exports = (on, config) => {
    on("task", {
        fetchEmails(options) {
            const { address } = options;
            return fetch(`http://127.0.0.1:8025/api/v2/search?kind=to&query=${address}`)
                .then(response => response.json())
                .then(json => json.items);
        }
    });
};

const mysql = require("mysql");

function queryTestDb(query, config) {
    // creates a new mysql connection using credentials from cypress.json env's
    const connection = mysql.createConnection(config.env.db);
    // start connection to db
    connection.connect();
    // exec query + disconnect to db as a Promise
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) reject(error);
            else {
                connection.end();
                // console.log(results)
                return resolve(results);
            }
        });
    });
}

module.exports = (on, config) => {
    // Usage: cy.task('queryDb', query)
    on("task", {
        queryDb: query => {
            return queryTestDb(query, config);
        }
    });
};

const sqlServer = require('cypress-sql-server');

module.exports = (on, config) => {
    tasks = sqlServer.loadDBPlugin(config.db);
    on('task', tasks);
}