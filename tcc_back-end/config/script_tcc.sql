create database oficinas_web; 
use oficinas_web;

CREATE TABLE IF NOT EXISTS produto (
id_produto int auto_increment PRIMARY KEY,
nome_produto varchar(30),
valor_produto float,
caracteristicas text,
descricao_prod text,
tipo_do_produto char(1),
foto1 longblob,
foto2 longblob,
foto3 longblob,
foto4 longblob,
foto5 longblob,
foto6 longblob
);

CREATE TABLE IF NOT EXISTS visitante (
id_visit int auto_increment PRIMARY KEY,
nome varchar(30),
telefone_visitante char(11),
email_visit varchar(90),
senha varchar(90),
foto longblob,
tipo_usuario char(1)
);

CREATE TABLE IF NOT EXISTS proprietario (
id_prop int auto_increment primary key,
email_prop varchar(90),
cnpj_oficina char(14),
cpf varchar(20),
nome_proprietario varchar(30),
telefone varchar(20),
senha varchar(90),
foto longblob,
tipo_usuario char(1)
);

CREATE TABLE IF NOT EXISTS oficina (
cnpj_oficina char(14) PRIMARY KEY,
id_prop int,
nome_oficina varchar(90),
cep char(8),
numero_ofc varchar(5),
id_planos int, 
email_oficina varchar(90),
telefone char(11),
celular char(11),
horario_funcionamento text,
descricao_ofc longtext,
instagram varchar(90),
facebook varchar(90),
area_atuacao text,
foto1 longblob,
foto2 longblob,
foto3 longblob,
foto4 longblob,
foto5 longblob,
foto6 longblob
);

CREATE TABLE IF NOT EXISTS favorita_produto (
id_produto int,
id_visit int,
favorita boolean
);

CREATE TABLE IF NOT EXISTS favorita_oficina (
cnpj_oficina char(14),
id_visit int,
favorita boolean
);

CREATE TABLE IF NOT EXISTS planos (
id_planos int auto_increment PRIMARY KEY,
cnpj_oficina char(14),
nome_plano varchar(30),
preco decimal,
descricao varchar(50)
);

CREATE TABLE IF NOT EXISTS vizualiza (
cnpj_oficina char,
id_produto int,
id_visit int,
contagem_oficina decimal,
contagem_produto decimal,
contagem_geral decimal(4)
);

CREATE TABLE IF NOT EXISTS anuncia (
id_anuncio int auto_increment PRIMARY KEY,
cnpj_oficina char(14),
id_produto int
);

CREATE TABLE IF NOT EXISTS avalia (
avalia char(5),
foto1 longblob,
descricao_avalia varchar(50),
id_produto int,
id_visit int
);

CREATE TABLE IF NOT EXISTS moderador(
gmail_mod varchar(90),
senha_mod varchar(90)
);

CREATE TABLE IF NOT EXISTS notificacao(
cnpj_oficina char,
texto longtext,
foto1 longblob
);

ALTER TABLE notificacao
ADD CONSTRAINT destinatario FOREIGN KEY(cnpj_oficina) REFERENCES oficina (cnpj_oficina);

ALTER TABLE proprietario
ADD CONSTRAINT possui_ofc FOREIGN KEY(cnpj_oficina) REFERENCES oficina (cnpj_oficina);

ALTER TABLE oficina
ADD CONSTRAINT plano_adquirido FOREIGN KEY(id_planos) REFERENCES planos (id_planos),
ADD CONSTRAINT dono_ofc FOREIGN KEY(id_prop) REFERENCES proprietario (id_prop);

ALTER TABLE favorita_produto
ADD CONSTRAINT produto_favoritado FOREIGN KEY(id_produto) REFERENCES produto (id_produto),
ADD CONSTRAINT visit_produto FOREIGN KEY(id_visit) REFERENCES visitante (id_visit);

ALTER TABLE favorita_oficina
ADD CONSTRAINT oficina_favoritado FOREIGN KEY(cnpj_oficina) REFERENCES oficina (cnpj_oficina),
ADD CONSTRAINT visit_oficina FOREIGN KEY(id_visit) REFERENCES visitante (id_visit);

ALTER TABLE vizualiza
ADD CONSTRAINT oficina_visualizada FOREIGN KEY(cnpj_oficina) REFERENCES oficina (cnpj_oficina),
ADD CONSTRAINT produto_visualizado FOREIGN KEY(id_produto) REFERENCES produto (id_produto),
ADD CONSTRAINT quem_vizualiza FOREIGN KEY(id_visit) REFERENCES visitante (id_visit);

ALTER TABLE anuncia
ADD CONSTRAINT referente FOREIGN KEY(cnpj_oficina) REFERENCES oficina (cnpj_oficina),
ADD CONSTRAINT produto FOREIGN KEY(id_produto) REFERENCES produto (id_produto);

ALTER TABLE avalia
ADD CONSTRAINT produto_avaliado FOREIGN KEY(id_produto) REFERENCES produto (id_produto),
ADD CONSTRAINT quem_avaliou FOREIGN KEY(id_visit) REFERENCES visitante (id_visit);