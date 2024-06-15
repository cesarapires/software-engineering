ALTER TABLE share_plus.carteira_acao ADD CONSTRAINT un_acao UNIQUE (id_acao);

ALTER TABLE share_plus.historico_compras ADD COLUMN fl_compra bool not null default false;
ALTER TABLE share_plus.historico_compras
    ALTER COLUMN id_usuario SET NOT NULL,
    ALTER COLUMN id_acao SET NOT NULL,
    ALTER COLUMN id_carteira SET NOT NULL,
    ALTER COLUMN quantidade SET NOT NULL,
    ALTER COLUMN valor SET NOT NULL;
