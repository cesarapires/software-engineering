package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.request.UpdateUserDTO;
import com.software.engineering.share.plus.dto.response.UsuarioDTO;
import com.software.engineering.share.plus.entity.Usuario;
import com.software.engineering.share.plus.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

        return ResponseEntity.ok(usuarioService.findUsuario(currentUser.getEmail()));
    }

    @GetMapping
    public ResponseEntity<UsuarioDTO> findById(@RequestParam Long id) {
        UsuarioDTO usuarioDTO = usuarioService.findUsuario(id);
        return ResponseEntity.ok(usuarioDTO);
    }

    @PostMapping("/update-user")
    public ResponseEntity<Void> updateUser(@RequestBody UpdateUserDTO updateUserDTO) {
        usuarioService.updateUser(updateUserDTO);

        return ResponseEntity.accepted().build();
    }

    @PostMapping("/add-saldo")
    public ResponseEntity<Void> addSaldo(@RequestParam Double valor) {
        usuarioService.addSaldo(valor);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Void> withdraw(@RequestParam Double valor) {
        usuarioService.removeSaldo(valor);
        return ResponseEntity.ok().build();
    }
}
