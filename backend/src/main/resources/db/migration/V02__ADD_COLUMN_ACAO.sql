ALTER TABLE share_plus.acao ADD COLUMN preco DOUBLE PRECISION NOT NULL DEFAULT 0;
COMMENT ON COLUMN share_plus.acao.preco IS 'Preço da ação no dia de hoje';