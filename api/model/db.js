import mysql2 from 'mysql2/promise';

export const db = mysql2.createPool({
    user: 'freedb_aprendendo6',
    password: 'x47MEJt$n#xJ9X&',
    host: 'sql.freedb.tech',
    database: 'freedb_pratica6'  
});

export default db;