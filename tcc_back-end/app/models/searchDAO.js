module.exports = class PlanosDAO{
 
    constructor(conexao) {
        this.conexao = conexao;
    }

    searchOficina = (param)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM oficina WHERE nome_oficina LIKE '%${param}%'`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    searchProduto = (param)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM produto WHERE nome_produto LIKE '%${param}%' AND tipo_do_produto = 1`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    searchServico = (param)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM produto WHERE nome_produto LIKE '%${param}%' AND tipo_do_produto = 2`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

}