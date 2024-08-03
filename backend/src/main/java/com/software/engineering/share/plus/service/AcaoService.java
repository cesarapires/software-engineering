package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.response.AcaoListagemDTO;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.repository.AcaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcaoService {
    private final AcaoRepository acaoRepository;

    public List<Acao> findAll() {
        return acaoRepository.findAll();
    }

    public Acao findById(Long id) {
        return acaoRepository.findById(id).orElseThrow(() -> new BadRequestException("Ação não encontrada na base de dados."));
    }

    public List<AcaoListagemDTO> findFilteredAcoes() {
        return acaoRepository.findAllDTO();
    }
}
