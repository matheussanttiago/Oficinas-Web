module.exports = class TarefasDAO{
 
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

}