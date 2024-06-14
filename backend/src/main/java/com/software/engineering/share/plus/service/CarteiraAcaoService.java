package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.request.BuyAcaoDTO;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.model.CarteiraAcao;
import com.software.engineering.share.plus.model.HistoricoCompras;
import com.software.engineering.share.plus.model.Usuario;
import com.software.engineering.share.plus.repository.CarteiraAcaoRepository;
import com.software.engineering.share.plus.repository.HistoricoComprasRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CarteiraAcaoService {
    private final AcaoService acaoService;
    private final CarteiraService carteiraService;
    private final CarteiraAcaoRepository carteiraAcaoRepository;
    private final HistoricoComprasRepository historicoComprasRepository;

    @Transactional
    public CarteiraAcao buyAcao(BuyAcaoDTO dto) {
        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Acao acao = acaoService.findById(dto.getIdAcao());
        Double totalTransacao = acao.getPreco() * dto.getQuantidade();

        usuario.checkSaldo(totalTransacao);
        Carteira carteira = carteiraService.findById(dto.getIdCarteira());

        CarteiraAcao carteiraAcao = carteiraAcaoRepository.save(new CarteiraAcao(dto.getQuantidade(), acao, carteira));
        historicoComprasRepository.save(new HistoricoCompras(carteiraAcao));
        return carteiraAcao;
    }
}
