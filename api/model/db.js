
import mysql2 from 'mysql2/promise';

export const db = mysql2.createPool({
    user: 'seu_user',
    password: 'sua_senha',
    host: 'seu_host',
    database: 'seu_banco-de-dados'  
});

export default db;
