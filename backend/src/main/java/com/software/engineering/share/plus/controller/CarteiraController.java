package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.request.CarteiraToSaveDTO;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.service.CarteiraService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "${api-prefix}/carteira")
@RequiredArgsConstructor
public class CarteiraController {
    private final CarteiraService carteiraService;

    @PostMapping("/save")
    public ResponseEntity<Carteira> save(@RequestBody CarteiraToSaveDTO carteira) {
        return ResponseEntity.ok(carteiraService.salvar(carteira));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Carteira>> findAll(@RequestParam("idUsuario") Long idUsuario) {
        return ResponseEntity.ok(carteiraService.findAllByUsuarioId(idUsuario));
    }
}
