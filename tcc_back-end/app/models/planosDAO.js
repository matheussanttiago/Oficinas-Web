module.exports = class PlanosDAO{
 
    constructor(conexao) {
        this.conexao = conexao;
    }

    CadPlanoBasico = (cnpjBD)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`UPDATE oficina SET id_planos = '1' WHERE cnpj_oficina = '${cnpjBD}'`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    
    CadPlanoPrata = (cnpjBD)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`UPDATE oficina SET id_planos = '2' WHERE cnpj_oficina = '${cnpjBD}'`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    CadPlanoOuro = (cnpjBD)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`UPDATE oficina SET id_planos = '3' WHERE cnpj_oficina = '${cnpjBD}'`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    CadPlanoDima = (cnpjBD)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`UPDATE oficina SET id_planos = '4' WHERE cnpj_oficina = '${cnpjBD}'`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

}