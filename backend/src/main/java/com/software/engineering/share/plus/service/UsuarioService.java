package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.UsuarioDTO;
import com.software.engineering.share.plus.mapper.UsuarioMapper;
import com.software.engineering.share.plus.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioMapper usuarioMapper;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public UsuarioDTO findUsuario(String email) {
        return usuarioMapper.convertDTO(usuarioRepository.findByEmail(email).orElseThrow());
    }
}
