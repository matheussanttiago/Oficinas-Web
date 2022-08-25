module.exports = class TarefasDAO{
 
    constructor(conexao) {
        this.conexao = conexao;
    }
    
    CadVisitante = (dadosForm)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`insert into visitante SET ?`, dadosForm,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    CadProprietario = (dadosForm)=>{
        return new Promise((resolve, reject)=>{
            this.conexao.query(`insert into proprietario SET ?`, dadosForm,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

}