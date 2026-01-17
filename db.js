const mysql = require('mysql2');

// Veritabanı ayarları
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',     // XAMPP kullanıyorsan boş bırak
    database: 'superstep_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection.promise(); // Promise yapısı kullanıyoruz (async/await için)