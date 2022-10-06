module.exports = class ProdutosDAO{
 
    constructor(conexao) {
        this.conexao = conexao;
    }
    
    CadProduto = (dadosForm)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`insert into produto SET ?`, dadosForm,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    // PRODUTOS
    getProdutos = ()=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM produto WHERE tipo_do_produto = '1'`, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOneProduto = (idProd)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM produto WHERE id_produto = '${idProd}'`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getProdutoOfc = (cnpj)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM produto WHERE cnpj_oficina = '${cnpj}' AND tipo_do_produto = 1`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getProdutoId = ()=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT LAST_INSERT_ID()`, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };


    // SERVICOS
    getServicos = ()=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM produto WHERE tipo_do_produto = '2'`, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOneServico = (idProd)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM produto WHERE id_produto = '${idProd}'`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getServicoOfc = (cnpj)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM produto WHERE cnpj_oficina = '${cnpj}' AND tipo_do_produto = 2`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    addCategoria = (dadosCategoria)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`INSERT INTO produto_atuacao SET ?`, dadosCategoria, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };


}