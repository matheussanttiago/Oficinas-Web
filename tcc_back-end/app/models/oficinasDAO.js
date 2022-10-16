module.exports = class OficinasDAO {

    constructor(conexao) {
        this.conexao = conexao;
    }

    CadOficina = (dadosForm) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`insert into oficina SET ?`, dadosForm, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOficinas = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM oficina`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOneOficina = (nomeTela) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM oficina WHERE nome_tela = '${nomeTela}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOneOficinaCnpj = (cnpj) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM oficina WHERE cnpj_oficina = '${cnpj}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOficinaProp = (id_usu, nome_tela) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM oficina WHERE id_prop = '${id_usu}' AND nome_tela != '${nome_tela}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getAnunciante = (cnpj) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM oficina WHERE cnpj_oficina = '${cnpj}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    // GET CATEGORIAS
    addCategoria = (dadosCategoria) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`INSERT INTO oficina_atuacao SET ?`, dadosCategoria, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOficinasMoto = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT cnpj_oficina FROM oficina_atuacao where tipo_veiculo_id = 1`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getOficinasCarro = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT cnpj_oficina FROM oficina_atuacao where tipo_veiculo_id = 2`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getOficinasVan = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT cnpj_oficina FROM oficina_atuacao where tipo_veiculo_id = 3`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getOficinasCaminhao = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT cnpj_oficina FROM oficina_atuacao where tipo_veiculo_id = 4`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getOficinasBicicleta = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT cnpj_oficina FROM oficina_atuacao where tipo_veiculo_id = 5`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

}