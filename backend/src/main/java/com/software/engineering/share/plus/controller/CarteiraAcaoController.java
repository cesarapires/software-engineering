package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.request.BuyAcaoDTO;
import com.software.engineering.share.plus.dto.request.SellAcaoDTO;
import com.software.engineering.share.plus.dto.response.CarteiraDetailDTO;
import com.software.engineering.share.plus.entity.CarteiraAcao;
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

    @PostMapping("/purchase")
    public ResponseEntity<CarteiraAcao> purchaseAcao(@RequestBody BuyAcaoDTO dto) {
        return ResponseEntity.ok(carteiraAcaoService.buyAcao(dto));
    }

    @PostMapping("/sell")
    public ResponseEntity<CarteiraDetailDTO> sellAcao(@RequestBody SellAcaoDTO dto) {
        return ResponseEntity.ok(carteiraAcaoService.sellAcao(dto));
    }
}
