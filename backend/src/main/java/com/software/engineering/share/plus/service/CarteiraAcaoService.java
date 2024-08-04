package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.request.BuyAcaoDTO;
import com.software.engineering.share.plus.dto.request.SellAcaoDTO;
import com.software.engineering.share.plus.dto.response.CarteiraDetailDTO;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.mapper.CarteiraMapper;
import com.software.engineering.share.plus.entity.Acao;
import com.software.engineering.share.plus.entity.Carteira;
import com.software.engineering.share.plus.entity.CarteiraAcao;
import com.software.engineering.share.plus.entity.HistoricoTransacao;
import com.software.engineering.share.plus.repository.CarteiraAcaoRepository;
import com.software.engineering.share.plus.repository.HistoricoTransacaoRepository;
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
    private final HistoricoTransacaoRepository historicoTransacaoRepository;
    private final CarteiraMapper carteiraMapper;

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
        saveHistoricoTransacao(carteira, acao, dto.getQuantidade(), totalTransacao, true);

        return carteiraAcao;
    }

    @Transactional
    public CarteiraDetailDTO sellAcao(SellAcaoDTO dto) {
        Acao acao = acaoService.findById(dto.getIdAcao());
        Carteira carteira = carteiraService.findById(dto.getIdCarteira());
        CarteiraAcao carteiraAcao = findCarteiraAcao(carteira, acao);
        validateQuantidade(carteiraAcao, dto.getQuantidade());

        Double totalTransacao = acao.getPreco() * dto.getQuantidade();
        removeQuantidade(carteiraAcao, dto.getQuantidade());
        usuarioService.addSaldo(totalTransacao);
        saveHistoricoTransacao(carteira, acao, dto.getQuantidade(), totalTransacao, false);

        return carteiraMapper.convertToDetailDTO(carteira);
    }

    private CarteiraAcao findCarteiraAcao(Carteira carteira, Acao acao) {
        return carteiraAcaoRepository.findByCarteiraIsAndAcaoIs(carteira, acao)
                .orElseThrow(() -> new BadRequestException("Ação não encontrada na carteira"));
    }

    private void validateQuantidade(CarteiraAcao carteiraAcao, int quantidade) {
        if (carteiraAcao.getQuantidade() < quantidade) {
            throw new BadRequestException("Quantidade insuficiente para venda");
        }
    }

    private void removeQuantidade(CarteiraAcao carteiraAcao, int quantidade) {
        carteiraAcao.setQuantidade(carteiraAcao.getQuantidade() - quantidade);
        if (carteiraAcao.getQuantidade() == 0) {
            carteiraAcaoRepository.delete(carteiraAcao);
        } else {
            carteiraAcaoRepository.save(carteiraAcao);
        }
    }

    private void saveHistoricoTransacao(Carteira carteira, Acao acao, int quantidade, Double totalTransacao, boolean isCompra) {
        historicoTransacaoRepository.save(
                new HistoricoTransacao(carteira, acao, quantidade, totalTransacao, isCompra)
        );
    }
}
