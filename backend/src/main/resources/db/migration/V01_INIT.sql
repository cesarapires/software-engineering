-- Tabela carteira
CREATE TABLE share_plus.carteira (
    id SERIAL PRIMARY KEY,
    nome TEXT UNIQUE,  -- Nome da carteira
    id_usuario INTEGER  -- ID da conta associada à carteira
);

COMMENT ON TABLE share_plus.carteira IS 'Tabela que armazena as carteiras';
COMMENT ON COLUMN share_plus.carteira.nome IS 'Nome da carteira';
COMMENT ON COLUMN share_plus.carteira.id_usuario IS 'ID do usuário associado à carteira';

-- Tabela acao
CREATE TABLE share_plus.acao (
    id SERIAL PRIMARY KEY,
    codigo TEXT UNIQUE,  -- Código da ação
    nome TEXT,                -- Nome da ação
    valor DOUBLE PRECISION       -- Valor da ação
);

COMMENT ON TABLE share_plus.acao IS 'Tabela que armazena as ações';
COMMENT ON COLUMN share_plus.acao.codigo IS 'Código da ação';
COMMENT ON COLUMN share_plus.acao.nome IS 'Nome da ação';
COMMENT ON COLUMN share_plus.acao.valor IS 'Valor da ação';

-- Tabela Usuario
CREATE TABLE share_plus.usuario (
    id SERIAL PRIMARY KEY,
    nome TEXT,  -- Nome do usuário
    email TEXT,             -- Email do usuário
    saldo DOUBLE PRECISION,    -- Saldo do usuário
    senha TEXT
);

COMMENT ON TABLE share_plus.usuario IS 'Tabela que armazena os usuários';
COMMENT ON COLUMN share_plus.usuario.nome IS 'Nome do usuário';
COMMENT ON COLUMN share_plus.usuario.email IS 'Email do usuário';
COMMENT ON COLUMN share_plus.usuario.saldo IS 'Saldo do usuário';
COMMENT ON COLUMN share_plus.usuario.senha IS 'Senha do usuário';

-- Tabela carteira_acao (Relação entre carteiras e ações)
CREATE TABLE share_plus.carteira_acao (
    id SERIAL PRIMARY KEY,
    id_carteira INTEGER REFERENCES share_plus.carteira(id),  -- ID da carteira
    id_acao INTEGER REFERENCES share_plus.acao(id),  -- ID da ação
    quantidade INTEGER  -- Quantidade de ações na carteira
);

COMMENT ON TABLE share_plus.carteira_acao IS 'Tabela que relaciona carteiras com ações';
COMMENT ON COLUMN share_plus.carteira_acao.id_carteira IS 'ID da carteira';
COMMENT ON COLUMN share_plus.carteira_acao.id_acao IS 'ID da ação';
COMMENT ON COLUMN share_plus.carteira_acao.quantidade IS 'Quantidade de ações na carteira';

-- Tabela historico_compras (Histórico de compras de ações)
CREATE TABLE share_plus.historico_compras (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES share_plus.usuario(id),  -- ID do usuário que fez a compra
    id_acao INTEGER REFERENCES share_plus.acao(id),  -- ID da ação comprada
    data_compra TIMESTAMP,  -- Data e hora da compra
    quantidade INTEGER,     -- Quantidade de ações compradas
    valor DOUBLE PRECISION  -- Valor total da compra
);

COMMENT ON TABLE share_plus.historico_compras IS 'Tabela que armazena o histórico de compras de ações';
COMMENT ON COLUMN share_plus.historico_compras.id_usuario IS 'ID do usuário que fez a compra';
COMMENT ON COLUMN share_plus.historico_compras.id_acao IS 'ID da ação comprada';
COMMENT ON COLUMN share_plus.historico_compras.data_compra IS 'Data e hora da compra';
COMMENT ON COLUMN share_plus.historico_compras.quantidade IS 'Quantidade de ações compradas';
COMMENT ON COLUMN share_plus.historico_compras.valor IS 'Valor total da compra';