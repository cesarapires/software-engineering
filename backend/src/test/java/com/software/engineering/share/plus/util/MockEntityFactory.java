package com.software.engineering.share.plus.util;

import com.software.engineering.share.plus.dto.request.BuyAcaoDTO;
import com.software.engineering.share.plus.dto.request.SellAcaoDTO;
import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.model.CarteiraAcao;
import com.software.engineering.share.plus.model.HistoricoTransacao;
import com.software.engineering.share.plus.model.Usuario;

public class MockEntityFactory {
    public static Usuario createUsuario() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNome("Usuario");
        usuario.setEmail("usuario@email.com");
        return usuario;
    }
    public static Acao createAcao(Long id, Double preco) {
        Acao acao = new Acao();
        acao.setId(id);
        acao.setPreco(preco);
        return acao;
    }

    public static Carteira createCarteira(Long id) {
        Carteira carteira = new Carteira();
        carteira.setUsuario(createUsuario());
        carteira.setId(id);
        return carteira;
    }

    public static BuyAcaoDTO createBuyAcaoDTO(Long idAcao, Long idCarteira, int quantidade) {
        BuyAcaoDTO dto = new BuyAcaoDTO();
        dto.setIdAcao(idAcao);
        dto.setIdCarteira(idCarteira);
        dto.setQuantidade(quantidade);
        return dto;
    }

    public static CarteiraAcao createCarteiraAcao(int quantidade, Acao acao, Carteira carteira) {
        return new CarteiraAcao(quantidade, acao, carteira);
    }

    public static HistoricoTransacao createHistoricoTransacao(Carteira carteira, Acao acao, int quantidade, Double totalTransacao) {
        return new HistoricoTransacao(carteira, acao, quantidade, totalTransacao, true);
    }

    public static SellAcaoDTO createSellAcaoDTO(Long idAcao, Long idCarteira, int quantidade) {
        SellAcaoDTO dto = new SellAcaoDTO();
        dto.setIdAcao(idAcao);
        dto.setIdCarteira(idCarteira);
        dto.setQuantidade(quantidade);
        return dto;
    }
}
