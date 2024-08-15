package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.repository.CarteiraAcaoRepository;
import com.software.engineering.share.plus.repository.CarteiraRepository;
import com.software.engineering.share.plus.repository.HistoricoTransacaoRepository;
import com.software.engineering.share.plus.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CleanDataBaseService {

    private final CarteiraRepository carteiraRepository;

    private final UsuarioRepository usuarioRepository;

    private final HistoricoTransacaoRepository historicoTransacaoRepository;

    private final CarteiraAcaoRepository carteiraAcaoRepository;

    public void cleanDatabase() {
        carteiraRepository.deleteAll();
        usuarioRepository.deleteAll();
        historicoTransacaoRepository.deleteAll();
        carteiraAcaoRepository.deleteAll();
    }
}
