module.exports = class OficinasDAO{
 
    constructor(conexao) {
        this.conexao = conexao;
    }
    
    CadOficina = (dadosForm)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`insert into oficina SET ?`, dadosForm,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOficinas = ()=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM oficina`, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOneOficina = (nomeTela)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM oficina WHERE nome_tela = '${nomeTela}'`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOficinaProp = (id_usu)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`SELECT * FROM oficina WHERE id_prop = '${id_usu}'`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    addCategoria = (dadosCategoria)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`INSERT INTO oficina_atuacao SET ?`, dadosCategoria, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

}