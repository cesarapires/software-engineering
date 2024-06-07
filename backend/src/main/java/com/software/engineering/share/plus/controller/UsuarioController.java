package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.UsuarioDTO;
import com.software.engineering.share.plus.mapper.UsuarioMapper;
import com.software.engineering.share.plus.model.Usuario;
import com.software.engineering.share.plus.service.UsuarioService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${api-prefix}/usuario")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;

    @GetMapping("/me")
    public ResponseEntity<UsuarioDTO> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Usuario currentUser = (Usuario) authentication.getPrincipal();

        UsuarioDTO usuarioDTO = usuarioService.findUsuario(currentUser.getEmail());
        return ResponseEntity.ok(usuarioDTO);
    }
}
