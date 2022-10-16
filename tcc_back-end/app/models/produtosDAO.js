module.exports = class ProdutosDAO {

    constructor(conexao) {
        this.conexao = conexao;
    }

    CadProduto = (dadosForm) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`insert into produto SET ?`, dadosForm, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getTipoProduto = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT tipo_do_produto FROM PRODUTO WHERE id_produto = ${id_produto}`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getTipoProduto = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT tipo_do_produto FROM PRODUTO WHERE id_produto = ${id_produto}`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getAllProdutos = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM produto WHERE id_produto = ${id_produto}`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    // PRODUTOS
    getProdutos = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM produto WHERE tipo_do_produto = '1'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOneProduto = (idProd) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM produto WHERE id_produto = '${idProd}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getProduto = (idProd) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM produto WHERE id_produto = '${idProd} AND tipo_do_produto = 1'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getProdutoOfc = (cnpj) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM produto WHERE cnpj_oficina = '${cnpj}' AND tipo_do_produto = 1`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getProdutoId = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT LAST_INSERT_ID()`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };


    // GET CATEGORIAS
    getProdutosMoto = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 1`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getProdutosCarro = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 2`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getProdutosVan = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 3`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getProdutosCaminhao = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 4`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getProdutosBicicleta = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 5`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };



    // GET CATEGORIAS - PRODUTOS DA OFICINA
    getProdutosMotoOfc = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 1 and id_produto = '${id_produto}';`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getProdutosCarroOfc = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 2 and id_produto = '${id_produto}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getProdutosVanOfc = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 3 and id_produto = '${id_produto}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getProdutosCaminhaoOfc = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 4 and id_produto = '${id_produto}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    getProdutosBicicletaOfc = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT id_produto FROM produto_atuacao where tipo_veiculo_id = 5 and id_produto = '${id_produto}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };


    // SERVICOS
    getServicos = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM produto WHERE tipo_do_produto = '2'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getOneServico = (idProd) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM produto WHERE id_produto = '${idProd}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getServicoOfc = (cnpj) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM produto WHERE cnpj_oficina = '${cnpj}' AND tipo_do_produto = 2`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    addCategoria = (dadosCategoria) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`INSERT INTO produto_atuacao SET ?`, dadosCategoria, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    // AVALIAÇÕES
    avaliar = (dadosAvaliacao) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`INSERT INTO avalia SET ?`, dadosAvaliacao, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getAvaliacoes = (idProd) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM avalia WHERE id_produto = '${idProd}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getAvaliador = (id_visit) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT nome FROM visitante WHERE id_visit = '${id_visit}'`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getAvgAvalia = (id_prod) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT AVG(avalia) as media_avaliacao FROM avalia  where id_produto = ${id_prod}`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getNumAvaliacoes = (id_prod) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`select count(*) as num_avaliacoes from avalia where id_produto = ${id_prod}`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };


    getProdutosOfc = (cnpj) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`select id_produto from produto where cnpj_oficina = ${cnpj}`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getAvaliacaoProd = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT AVG(avalia) as media_avaliacao FROM avalia where id_produto = ${id_produto}`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    getHistoricoProd = (id_visit) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`SELECT * FROM avalia where id_visit = ${id_visit} ORDER BY id_avaliacao DESC`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };


    deleteProdutoAtuacao = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`DELETE FROM produto_atuacao where id_produto = ${id_produto}`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    deleteProduto = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query(`DELETE FROM produto where id_produto = ${id_produto}`, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };



}