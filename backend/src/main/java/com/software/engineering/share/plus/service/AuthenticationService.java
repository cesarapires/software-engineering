package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.configuration.GlobalLogger;
import com.software.engineering.share.plus.dto.request.ChangePasswordDTO;
import com.software.engineering.share.plus.dto.request.LoginDTO;
import com.software.engineering.share.plus.dto.request.RegisterUserDTO;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.model.Usuario;
import com.software.engineering.share.plus.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final Logger log = GlobalLogger.getInstance().logger();

    public Usuario signup(RegisterUserDTO input) {
        if (usuarioRepository.existsByEmail(input.getEmail())) {
            throw new BadRequestException("Email já cadastrado");
        };

        Usuario usuario = new Usuario();
        LocalDateTime now = LocalDateTime.now();

        usuario.setNome(input.getFullName());
        usuario.setEmail(input.getEmail());
        usuario.setDataCadastro(now);
        usuario.setDataAtualizacao(now);
        usuario.setSenha(passwordEncoder.encode(input.getPassword()));
        usuario = usuarioRepository.save(usuario);

        log.info("Usuário cadastrado: {}", usuario.getEmail());

        return usuarioRepository.save(usuario);
    }

    public void changePassword(ChangePasswordDTO changePasswordDTO) {
        String oldPassword = passwordEncoder.encode(changePasswordDTO.getOldPassword());
        String newPassword = passwordEncoder.encode(changePasswordDTO.getNewPassword());

        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        boolean oldPasswordIsValid = oldPassword.equals(usuario.getPassword());
        if (oldPasswordIsValid) {
            throw new BadRequestException("Senha incorreta");
        }

        usuario.setSenha(newPassword);

        usuarioRepository.save(usuario);
    }

    public Usuario authenticate(LoginDTO input) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword())
        );

        log.info("Usuário logado: {}", authenticate.getName());

        return (Usuario) authenticate.getPrincipal();
    }

    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }
}
