drop database oficinas_web; 
create database oficinas_web; 
use oficinas_web;

CREATE TABLE IF NOT EXISTS produto (
id_produto int auto_increment PRIMARY KEY,
nome_produto varchar(30),
cnpj_oficina char(14),
valor_produto decimal(10,2),
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
telefone_visitante char(12),
email_visit varchar(90),
senha varchar(90),
foto longblob,
tipo_usuario char(1)
);

CREATE TABLE IF NOT EXISTS proprietario (
id_prop int auto_increment primary key,
email_prop varchar(90),
cpf char(11),
nome_proprietario varchar(30),
telefone char(12),
senha varchar(90),
foto longblob,
tipo_usuario char(1)
);

CREATE TABLE IF NOT EXISTS oficina (
cnpj_oficina char(14) PRIMARY KEY,
id_prop int,
id_planos int,
nome_tela varchar(60),
nome_oficina varchar(60),
cep char(8),
numero_ofc varchar(5),
email_oficina varchar(90),
telefone char(12),
celular char(12),
horario_funcionamento text,
descricao_ofc longtext,
instagram varchar(90),
facebook varchar(90),
foto1 longblob,
foto2 longblob,
foto3 longblob,
foto4 longblob,
foto5 longblob,
foto6 longblob,
foto_perfil_ofc longblob
);

CREATE TABLE IF NOT EXISTS favorita_produto (
id_favorito_produto int auto_increment primary key,
id_produto int,
id_visit int,
favorita boolean
);

CREATE TABLE IF NOT EXISTS favorita_oficina (
id_favorito_ofc int auto_increment primary key,
cnpj_oficina char(14),
id_visit int,
favorita boolean
);

CREATE TABLE IF NOT EXISTS planos (
id_planos int auto_increment PRIMARY KEY,
nome_plano varchar(30),
preco decimal,
descricao varchar(100)
);

CREATE TABLE IF NOT EXISTS vizualiza (
id_vizualizacao int auto_increment primary key,
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
id_avaliacao int auto_increment PRIMARY KEY,
avalia char(5),
foto1 longblob,
descricao_avalia varchar(50),
id_produto int,
id_visit int
);

CREATE TABLE IF NOT EXISTS moderador(
id_mod int auto_increment PRIMARY KEY,
email_mod varchar(90),
senha_mod varchar(90)
);

CREATE TABLE IF NOT EXISTS notificacao(
id_notificacao int auto_increment PRIMARY KEY,
cnpj_oficina char,
texto longtext,
foto1 longblob
);


CREATE TABLE IF NOT EXISTS tipo_veiculo(
tipo_veiculo_id int primary key,
descricao text
);

CREATE TABLE IF NOT EXISTS oficina_atuacao(
oficina_atuacao int auto_increment PRIMARY KEY,
tipo_veiculo_id int,
cnpj_oficina char(14)
);

CREATE TABLE IF NOT EXISTS produto_atuacao(
produto_atuacao int auto_increment PRIMARY KEY,
tipo_veiculo_id int,
id_produto int
);


ALTER TABLE notificacao
ADD CONSTRAINT destinatario FOREIGN KEY(cnpj_oficina) REFERENCES oficina (cnpj_oficina);

alter table produto
add constraint oficina_cadastrou foreign key (cnpj_oficina) references oficina (cnpj_oficina);


ALTER TABLE oficina
ADD CONSTRAINT dono_ofc FOREIGN KEY(id_prop) REFERENCES proprietario (id_prop),
ADD CONSTRAINT contem_plano FOREIGN KEY ( id_planos) REFERENCES planos (id_planos);

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

ALTER TABLE produto_atuacao
ADD CONSTRAINT produto_atua_veiculo FOREIGN KEY (tipo_veiculo_id) REFERENCES tipo_veiculo (tipo_veiculo_id),
ADD CONSTRAINT qual_produto FOREIGN KEY(id_produto) REFERENCES produto (id_produto);

ALTER TABLE oficina_atuacao
ADD CONSTRAINT oficina_atua_veiculo FOREIGN KEY (tipo_veiculo_id) REFERENCES tipo_veiculo (tipo_veiculo_id),
ADD CONSTRAINT qual_oficina_atua FOREIGN KEY(cnpj_oficina) REFERENCES oficina (cnpj_oficina);


/* INSERTS */
-- LISTA DE INSER DE VEICULOS
insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 1, 'moto');
insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 2, 'carro');
insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 3 , 'vans');
insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 4 , 'caminhao');
insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 5 , 'bicicleta');

-- LISTA DE INSER DE PLANOS 
insert into planos ( nome_plano, preco, descricao) values ( 'basico' , 0 ,'gratuito, 3 produtos, 2 servicos');
insert into planos ( nome_plano, preco, descricao) values ( 'prata', 30 ,'avaliaçao de 30 dias, perfil oficina, visibilidade baixa, 10 serviços');
insert into planos ( nome_plano, preco, descricao) values ( 'ouro', 40 ,'perfil oficina, visibilidade media');
insert into planos ( nome_plano, preco, descricao) values ( 'diamante', 60 ,'perfil da oficina, visibilidade alta, destaque na home');

