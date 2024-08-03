package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.response.RelatorioTransacoesDTO;
import com.software.engineering.share.plus.model.Usuario;
import com.software.engineering.share.plus.repository.HistoricoTransacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoricoTransacaoService {
    private final HistoricoTransacaoRepository historicoTransacaoRepository;

    public List<RelatorioTransacoesDTO> findRelatorioTransacoes(Long idCarteira) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario currentUser = (Usuario) authentication.getPrincipal();
        return historicoTransacaoRepository.findTransacoes(currentUser.getId(), idCarteira);
    }

}
