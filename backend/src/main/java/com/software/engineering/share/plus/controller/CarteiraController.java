package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.request.CarteiraToSaveDTO;
import com.software.engineering.share.plus.dto.response.CarteiraDTO;
import com.software.engineering.share.plus.dto.response.CarteiraDetailDTO;
import com.software.engineering.share.plus.dto.response.CarteiraListagemDTO;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.model.Usuario;
import com.software.engineering.share.plus.service.CarteiraService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<CarteiraDTO> save(@RequestBody CarteiraToSaveDTO carteira) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario currentUser = (Usuario) authentication.getPrincipal();
        carteira.setIdUsuario(currentUser.getId());
        return ResponseEntity.ok(carteiraService.salvar(carteira));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CarteiraListagemDTO>> findAll() {
        return ResponseEntity.ok(carteiraService.findAllByUsuario());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> save(@RequestParam Long idCarteira) {
        carteiraService.deleteCarteiraIfEmpty(idCarteira);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{id}")
    public ResponseEntity<CarteiraDetailDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(carteiraService.findCarteiraDetails(id));
    }
}
