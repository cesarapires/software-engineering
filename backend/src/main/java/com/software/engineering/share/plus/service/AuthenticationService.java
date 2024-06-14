package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.request.LoginDTO;
import com.software.engineering.share.plus.dto.request.RegisterUserDTO;
import com.software.engineering.share.plus.model.Usuario;
import com.software.engineering.share.plus.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public Usuario signup(RegisterUserDTO input) {
        Usuario usuario = new Usuario();
        LocalDateTime now = LocalDateTime.now();

        usuario.setNome(input.getFullName());
        usuario.setEmail(input.getEmail());
        usuario.setDataCadastro(now);
        usuario.setDataAtualizacao(now);
        usuario.setSenha(passwordEncoder.encode(input.getPassword()));
        usuario = usuarioRepository.save(usuario);

        return usuarioRepository.save(usuario);
    }

    public Usuario authenticate(LoginDTO input) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword())
        );

        return (Usuario) authenticate.getPrincipal();
    }
}
