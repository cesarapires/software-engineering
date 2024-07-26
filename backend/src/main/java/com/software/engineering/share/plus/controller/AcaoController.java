package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.response.AcaoDTO;
import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.service.AcaoService;
import com.software.engineering.share.plus.service.BrapiService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${api-prefix}/acao")
@RequiredArgsConstructor
public class AcaoController {

    private final AcaoService acaoService;
    private final BrapiService brapiService;

    @GetMapping("find-filtered")
    public Page<AcaoDTO> buscarAcoes(@RequestParam(required = false) String codigo, Pageable pageable) {
        return acaoService.findFilteredAcoes(codigo, pageable);
    }

    @PostMapping("update")
    public void atualizarAcoes() {
        brapiService.fetchAndSaveStocks();
    }
}
