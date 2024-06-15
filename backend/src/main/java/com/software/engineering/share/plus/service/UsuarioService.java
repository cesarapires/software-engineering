package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.response.UsuarioDTO;
import com.software.engineering.share.plus.model.Usuario;
import com.software.engineering.share.plus.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final ConversionService conversionService;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public UsuarioDTO findUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        return conversionService.convert(usuario, UsuarioDTO.class);
    }

    @Transactional
    public UsuarioDTO findUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow();
        return conversionService.convert(usuario, UsuarioDTO.class);
    }

    @Transactional
    public void addSaldo(Usuario usuario, Double valor) {
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
