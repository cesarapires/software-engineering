package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.response.RelatorioTransacoesDTO;
import com.software.engineering.share.plus.service.HistoricoTransacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "${api-prefix}/historico-transacao")
@RequiredArgsConstructor
public class HistoricoTransacaoController {
    private final HistoricoTransacaoService historicoTransacaoService;

    @GetMapping
    public ResponseEntity<List<RelatorioTransacoesDTO>> findRelatorio(@RequestParam Long idCarteira) {
        return ResponseEntity.ok(historicoTransacaoService.findRelatorioTransacoes(idCarteira));
    }
}
