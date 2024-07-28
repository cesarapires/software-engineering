package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.response.ResponseBrapi;
import com.software.engineering.share.plus.dto.response.Stock;
import com.software.engineering.share.plus.mapper.AcaoMapper;
import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.repository.AcaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BrapiService {

    private final AcaoRepository acaoRepository;

    public void fetchAndSaveStocks() {
        String url = "https://brapi.dev/api/quote/list";
        RestTemplate restTemplate = new RestTemplate();
        ResponseBrapi response = restTemplate.getForObject(url, ResponseBrapi.class);

        if (response == null) {
            return;
        }

        List<Stock> stocks = response.getStocks();

        List<Acao> acoes = new ArrayList<>(stocks.size());
        for (Stock stock : stocks) {
            Acao acao = acaoRepository.findByCodigo(stock.getStock());
            if (acao == null) {
                acao = new Acao();
            }
            acao.setCodigo(stock.getStock());
            acao.setNome(stock.getName());
            acao.setLogo(stock.getLogo());
            acao.setPreco(stock.getClose());

            acoes.add(acao);
        }

        acaoRepository.saveAll(acoes);
    }
}
