ALTER TABLE share_plus.carteira_acao DROP CONSTRAINT un_acao;
ALTER TABLE share_plus.carteira_acao ADD CONSTRAINT un_acao UNIQUE (id_acao, id_carteira);
