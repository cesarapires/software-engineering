package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.configuration.GlobalLogger;
import com.software.engineering.share.plus.dto.response.UsuarioDTO;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.mapper.UsuarioMapper;
import com.software.engineering.share.plus.model.Usuario;
import com.software.engineering.share.plus.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioMapper usuarioMapper;
    private final UsuarioRepository usuarioRepository;
    private final Logger log = GlobalLogger.getInstance().logger();

    @Transactional
    public UsuarioDTO findUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        return usuarioMapper.convert(usuario);
    }

    @Transactional
    public UsuarioDTO findUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow();
        return usuarioMapper.convert(usuario);
    }

    @Transactional
    public void addSaldo(Usuario usuario, Double valor) {
        if (valor <= 0) {
            log.info("Não foi possível realizar o depósito para o usuario {}", usuario.getEmail());
            throw new BadRequestException("Valor a ser depositado deve ser positivo.");
        }
        usuario.setSaldo(usuario.getSaldo() + valor);
        usuarioRepository.save(usuario);
    }

    @Transactional
    public void addSaldo(Double valor) {
        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        addSaldo(usuario, valor);
    }

    @Transactional
    public void removeSaldo(Usuario usuario, Double valor) {
        if (valor <= 0) {
            throw new BadRequestException("Valor a ser sacado deve ser positivo.");
        }
        usuario.checkSaldo(valor);
        usuario.setSaldo(usuario.getSaldo() - valor);
        usuarioRepository.save(usuario);
    }

    @Transactional
    public void removeSaldo(Double valor) {
        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        removeSaldo(usuario, valor);
    }
}
