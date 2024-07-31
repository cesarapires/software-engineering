package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.request.CarteiraToSaveDTO;
import com.software.engineering.share.plus.dto.response.CarteiraListagem;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.exception.EntityAlreadyExistsException;
import com.software.engineering.share.plus.mapper.CarteiraMapper;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.repository.CarteiraAcaoRepository;
import com.software.engineering.share.plus.repository.CarteiraRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarteiraService {

    private final CarteiraRepository carteiraRepository;
    private final CarteiraAcaoRepository carteiraAcaoRepository;
    private final CarteiraMapper carteiraMapper;

    public Carteira salvar(CarteiraToSaveDTO carteira) {
        Optional<Carteira> optional = carteiraRepository.findByNomeAndUsuarioId(carteira.getNome(), carteira.getIdUsuario());
        if (optional.isPresent()) {
            throw new EntityAlreadyExistsException("Carteira já existe para esse usuário");
        }

        return carteiraRepository.save(carteiraMapper.toEntity(carteira));
    }

    public List<CarteiraListagem> findAllByUsuarioId(Long idUsuario) {
        List<Carteira> all = carteiraRepository.findAllByUsuarioId(idUsuario);

        return all.stream().map(CarteiraListagem::new).toList();
    }

    public Carteira findById(Long id) {
        return carteiraRepository.findById(id).orElseThrow(() -> new BadRequestException("Carteira não encontrada na base de dados."));
    }

    @Transactional
    public void deleteCarteiraIfEmpty(Long idCarteira) {
        Carteira carteira = findById(idCarteira);

        boolean hasAcoes = carteiraAcaoRepository.existsByCarteira(carteira);

        if (hasAcoes) {
            throw new BadRequestException("Não é possível excluir a carteira pois ela contém ações");
        }

        carteiraRepository.delete(carteira);
    }
}
