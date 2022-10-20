const mysql = require('mysql2')

// class DbConnection {

//     connection(){
//         if(!this.conn){
//             this.conn = mysql.createConnection({
//                 host: 'localhost',
//                 user: 'root',
//                 password: '', //Senha da escola @ITB123456
//                 database: 'oficinas_web' // Banco de dados criado na escola
//             });

//             this.conn.connect((error) => {

//                 if(error) {
//                     console.log(`Error: ${error}`)
//                     throw error;
//                 };
//                 console.log('Conectado com sucesso!')


//             })
//         }
//         return this.conn;
//     }
// }

// module.exports = new DbConnection()

module.exports = function(){
    return mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "", // senha na escola @ITB123456
       database: "oficinas_web",
       port: 3306
     });
}