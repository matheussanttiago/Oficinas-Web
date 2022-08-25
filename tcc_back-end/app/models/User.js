// const DbConnection = require('../config/DbConnection');

// class User {

//     findUsers() {
//         return new Promise((resolve, reject) => {
//             const sql = `SELECT email, senha FROM proprietario union select email, senha from cad_visitante`
//             DbConnection.connection().query(sql, (err, result) => {
//                 if(err) reject(err)
//                 resolve(result)
//             })
//         })
//     }

//     findUser(username) {
//         return new Promise((resolve, reject) => {
//             const sql = `SELECT email, senha FROM proprietario WHERE email = '${username}' UNION SELECT email, senha  FROM cad_visitante WHERE email = '${username}'`
//             DbConnection.connection().query(sql, (err, result) => {
//                 console.log(result)
//                 if(err) reject(err)
//                 resolve(result[0])
//             })
//         })
//     }

//     findUserById(id) {
//         return new Promise((resolve, reject) => {
//             const sql = `SELECT email, senha FROM proprietario WHERE id = '${id}' union select email, senha from cad_visitante WHERE id = '${id}'`
//             DbConnection.connection().query(sql, (err, result) => {
//                 if(err) reject(err)
//                 resolve(result[0])
//             })
//         })
//     }

    

// };

// module.exports = new User()