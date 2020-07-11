const sqlite3 = require('sqlite3').verbose();

module.exports.setup_db = function() {

    let db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the events database.');
    });

    db.serialize(function() {
        db.run(`CREATE TABLE user_data(
                organization text NOT NULL,
                username text,
                action text,
                content text,
                repository text,
                createdAt Date,
                url VARCHAR(512)
                )`);
    });
}

module.exports.insertRow = function(row) {
    query = `INSERT INTO user_data(organization, username, action, content, repository, createdAt, url) VALUES(?,?,?,?,?,?,?)`;
    db.run(query, row, function(err){
        if(err) {
            console.log(err);
        }
        console.log('Inserted ', row);
    })
}

module.exports.getDatabyOrganization = function(org){
    let sql = `SELECT * from user_data where organization=?`;
    db.all(sql, [org], (err, rows) => {
        if (err) {
            throw err;
        }
        return rows;
    });
}