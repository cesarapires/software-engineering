package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.request.CarteiraToSaveDTO;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.exception.EntityAlreadyExistsException;
import com.software.engineering.share.plus.mapper.CarteiraMapper;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.repository.CarteiraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarteiraService {

    private final CarteiraRepository carteiraRepository;
    private final CarteiraMapper carteiraMapper;

    public Carteira salvar(CarteiraToSaveDTO carteira) {
        Optional<Carteira> optional = carteiraRepository.findByNomeAndUsuarioId(carteira.getNome(), carteira.getIdUsuario());
        if (optional.isPresent()) {
            throw new EntityAlreadyExistsException("Carteira já existe para esse usuário");
        }

        return carteiraRepository.save(carteiraMapper.toEntity(carteira));
    }

    public List<Carteira> findAllByUsuarioId(Long idUsuario) {
        return carteiraRepository.findAllByUsuarioId(idUsuario);
    }

    public Carteira findById(Long id) {
        return carteiraRepository.findById(id).orElseThrow(() -> new BadRequestException("Carteira não encontrada na base de dados."));
    }
}
