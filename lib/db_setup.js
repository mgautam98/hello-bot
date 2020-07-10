const sqlite3 = require('sqlite3').verbose();

module.exports.setup_db = function() {
    let db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the events database.');
    });
    db.run('CREATE TABLE langs(name text)');
}