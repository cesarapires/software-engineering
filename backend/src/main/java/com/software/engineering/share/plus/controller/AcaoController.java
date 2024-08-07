package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.response.AcaoListagemDTO;
import com.software.engineering.share.plus.dto.response.StockDetailDTO;
import com.software.engineering.share.plus.service.AcaoService;
import com.software.engineering.share.plus.service.BrapiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "${api-prefix}/acao")
@RequiredArgsConstructor
public class AcaoController {

    private final AcaoService acaoService;
    private final BrapiService brapiService;

    @GetMapping("find-filtered")
    public ResponseEntity<List<AcaoListagemDTO>> buscarAcoes() {
        return ResponseEntity.ok(acaoService.findFilteredAcoes());
    }

    @PostMapping("update")
    public void atualizarAcoes() {
        brapiService.fetchAndSaveStocks();
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<StockDetailDTO> buscarAcaoPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(brapiService.getStockDetails(codigo));
    }
}
