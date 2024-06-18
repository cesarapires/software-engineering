package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.request.BuyAcaoDTO;
import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.model.CarteiraAcao;
import com.software.engineering.share.plus.model.HistoricoCompras;
import com.software.engineering.share.plus.repository.CarteiraAcaoRepository;
import com.software.engineering.share.plus.repository.HistoricoComprasRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarteiraAcaoService {
    private final AcaoService acaoService;
    private final CarteiraService carteiraService;
    private final UsuarioService usuarioService;
    private final CarteiraAcaoRepository carteiraAcaoRepository;
    private final HistoricoComprasRepository historicoComprasRepository;

    @Transactional
    public CarteiraAcao buyAcao(BuyAcaoDTO dto) {
        Acao acao = acaoService.findById(dto.getIdAcao());
        Carteira carteira = carteiraService.findById(dto.getIdCarteira());

        Double totalTransacao = acao.getPreco() * dto.getQuantidade();
        usuarioService.removeSaldo(totalTransacao);

        Optional<CarteiraAcao> optionalCarteiraAcao = carteiraAcaoRepository.findByCarteiraIsAndAcaoIs(carteira, acao);
        CarteiraAcao carteiraAcao = optionalCarteiraAcao.orElseGet(() -> new CarteiraAcao(dto.getQuantidade(), acao, carteira));

        if (optionalCarteiraAcao.isPresent()) {
            carteiraAcao.setQuantidade(carteiraAcao.getQuantidade() + dto.getQuantidade());
        }

        carteiraAcaoRepository.save(carteiraAcao);
        historicoComprasRepository.save(
                new HistoricoCompras(carteira, acao, dto.getQuantidade(), totalTransacao, true)
        );

        return carteiraAcao;
    }
}
