package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.response.ResponseBrapi;
import com.software.engineering.share.plus.dto.response.ResultsBrapi;
import com.software.engineering.share.plus.dto.response.Stock;
import com.software.engineering.share.plus.dto.response.StockDetailDTO;
import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.repository.AcaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BrapiService {

    @Value("${brapi.token}")
    private String token;

    @Value("${brapi.url}")
    private String brapiUrl;

    private final RestTemplate restTemplate = new RestTemplate();


    private final AcaoRepository acaoRepository;

    public void fetchAndSaveStocks() {
        String url = brapiUrl + "/quote/list";

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
            acao.setSetor(stock.getSector());

            acoes.add(acao);
        }

        acaoRepository.saveAll(acoes);
    }

    public StockDetailDTO getStockDetails(String stockSymbol) {
        String url = String.format("%s/quote/%s?token=%s&range=1mo&interval=1d", brapiUrl, stockSymbol, token);
        ResultsBrapi response = restTemplate.getForObject(url, ResultsBrapi.class);
        return response.getResults().get(0);
    }

}
