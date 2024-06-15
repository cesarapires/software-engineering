package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.request.BuyAcaoDTO;
import com.software.engineering.share.plus.model.CarteiraAcao;
import com.software.engineering.share.plus.service.CarteiraAcaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api-prefix}/carteira-acao")
public class CarteiraAcaoController {
    private final CarteiraAcaoService carteiraAcaoService;

    @PostMapping("/buy-acao")
    public ResponseEntity<CarteiraAcao> buyAcao(@RequestBody BuyAcaoDTO dto) {
        return ResponseEntity.ok(carteiraAcaoService.buyAcao(dto));
    }
}
