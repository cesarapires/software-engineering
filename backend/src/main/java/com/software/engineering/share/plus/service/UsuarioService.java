package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.configuration.GlobalLogger;
import com.software.engineering.share.plus.dto.request.UpdateUserDTO;
import com.software.engineering.share.plus.dto.response.UsuarioDTO;
import com.software.engineering.share.plus.entity.Usuario;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.mapper.UsuarioMapper;
import com.software.engineering.share.plus.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

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

    @Transactional
    public void updateUser(UpdateUserDTO updateUserDTO) {
        if (updateUserDTO.getEmail().isEmpty()) {
            throw new BadRequestException("Email não pode ser vázio");
        }

        if (updateUserDTO.getName().isEmpty()) {
            throw new BadRequestException("Nome não pode ser vázio");
        }

        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        boolean emailIsEquals = Objects.equals(usuario.getEmail(), updateUserDTO.getEmail());
        boolean emailExists = usuarioRepository.existsByEmail(updateUserDTO.getEmail());

        if (!emailIsEquals && emailExists) {
            throw new BadRequestException("Email já está em uso por outro usuário");
        }

        usuario.setEmail(updateUserDTO.getEmail());
        usuario.setNome(updateUserDTO.getName());

        usuarioRepository.save(usuario);
    }
}
