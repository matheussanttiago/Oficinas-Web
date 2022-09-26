use oficinas_web;

insert into visitante (id_visit, nome, telefone_visitante, email_visit, senha, foto) values ( null, 'leonardo', '11997458353', 'leonardo@gmail.com', '123654789', null);
insert into visitante (id_visit, nome, telefone_visitante, email_visit, senha, foto) values ( null, 'ewerton', '11956478343', 'ewerton@gmail.com', '987654321', null);
insert into visitante (id_visit, nome, telefone_visitante, email_visit, senha, foto) values ( null, 'helivelto', '11938746527', 'helivelto@gmail.com', '029387465', null);
insert into visitante (id_visit, nome, telefone_visitante, email_visit, senha, foto) values ( null, 'mateus', '11983217340', 'mateus@gmail.com', '273451037', null);
insert into visitante (id_visit, nome, telefone_visitante, email_visit, senha, foto) values ( null, 'david', '11973924530', 'david@gmail.com', '192746352', null);
insert into visitante (id_visit, nome, telefone_visitante, email_visit, senha, foto) values ( null, 'joao', '11987265341', 'joao@gmail.com', '827162345', null);
insert into visitante (id_visit, nome, telefone_visitante, email_visit, senha, foto) values ( null, 'gabriel', '1191092837', 'gabriel@gmail.com', '345892710', null);

Select id_visit, nome, telefone_visitante, email_visit, senha, foto from visitante;
select * from visitante;
-- LISTA DE INSERT DO VISITANTE 

insert into proprietario (nome_proprietario, email_prop, telefone, senha) values ( 'ana', 'ana@gmail', '11937261523', '019283746');
insert into proprietario (nome_proprietario, email_prop, telefone, senha) values ( 'jose', 'jose@gmail', '11912745930', '098765431');
insert into proprietario (nome_proprietario, email_prop, telefone, senha) values ( 'jorge', 'jorge@gmail', '11982736451', '918276390');
insert into proprietario (nome_proprietario, email_prop, telefone, senha) values ( 'patricia', 'patricia@gmail', '11982645143', '019287364');

Select nome_proprietario, email_prop, telefone, senha from proprietario;
select * from proprietario;
-- LISTA DE INSERT DO PROPRIETARIO 

Insert into moderador (email_mod, senha_mod) values ('leonardo@gmail.com',' 123654789');
Insert into moderador (email_mod, senha_mod) values ('helivelto@gmail.com',' 029387465');
Insert into moderador (email_mod, senha_mod) values ('mateus@gmail.com',' 273451037');

Select email_mod, senha_mod from moderador;
select * from moderador;

-- LISTA DE INSERT DO MOD 

insert into oficina (cnpj_oficina, nome_oficina, cep, numero_ofc, email_oficina, telefone, celular, horario_funcionamento, descricao_ofc, instagram, facebook) values ('12345678932165', 'ana Serviços Automotivos', '06402200','27', 'camiloservicosautomotivos@gmail.com','1141985320', null, 'abre 9 horas e fechas as 6', 'fazemos troca de olho e vendemos pneus', null, null);

Select cnpj_oficina, nome_oficina, cep, numero_ofc, email_oficina, telefone, celular, horario_funcionamento, descricao_ofc, instagram, facebook from oficina;
select * from oficina;
-- LISTA DE INSERT DA OFICINA

insert into produto (id_produto, nome_produto, valor_produto, caracteristicas, descricao_prod, tipo_do_produto) values (null, 'troca de oléo','80','troca de oléo limpa','fazemos troca de oléo','2');
insert into produto (id_produto, nome_produto, valor_produto, caracteristicas, descricao_prod, tipo_do_produto) values (null, 'pneu','150','pneu aro 16A','pneu aro 16','1');

select * from produto;

-- LISTA DE INSERT DOS PRODUTOS

insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 1, 'moto');
insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 2, 'carro');
insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 3 , 'vans');
insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 4 , 'caminhao');
insert into tipo_veiculo (tipo_veiculo_id, descricao) values ( 5 , 'bicicleta');

select * from produto;

-- LISTA DE INSER DE VEICULOS

insert into planos ( nome_plano, preco, descricao) values ( 'basico' , 0 ,'gratuito, 3 produtos, 2 servicos');
insert into planos ( nome_plano, preco, descricao) values ( 'prata', 30 ,'avaliaçao de 30 dias, perfil oficina, visibilidade baixa, 10 serviços');
insert into planos ( nome_plano, preco, descricao) values ( 'ouro', 40 ,'perfil oficina, visibilidade media');
insert into planos ( nome_plano, preco, descricao) values ( 'diamante', 60 ,'perfil da oficina, visibilidade alta, destaque na home');

-- LISTA DE INSER DE PLANOS 

