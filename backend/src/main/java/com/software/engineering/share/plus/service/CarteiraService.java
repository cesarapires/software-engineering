package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.configuration.GlobalLogger;
import com.software.engineering.share.plus.dto.request.CarteiraToSaveDTO;
import com.software.engineering.share.plus.dto.request.CarteiraToUpdateDTO;
import com.software.engineering.share.plus.dto.response.CarteiraDTO;
import com.software.engineering.share.plus.dto.response.CarteiraDetailDTO;
import com.software.engineering.share.plus.dto.response.CarteiraListagemDTO;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.exception.EntityAlreadyExistsException;
import com.software.engineering.share.plus.mapper.CarteiraMapper;
import com.software.engineering.share.plus.entity.Carteira;
import com.software.engineering.share.plus.entity.Usuario;
import com.software.engineering.share.plus.repository.CarteiraAcaoRepository;
import com.software.engineering.share.plus.repository.CarteiraRepository;
import com.software.engineering.share.plus.repository.HistoricoTransacaoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarteiraService {

    private final CarteiraRepository carteiraRepository;
    private final CarteiraAcaoRepository carteiraAcaoRepository;
    private final CarteiraMapper carteiraMapper;
    private final HistoricoTransacaoRepository historicoTransacaoRepository;
    private final Logger log = GlobalLogger.getInstance().logger();

    public CarteiraDTO salvar(CarteiraToSaveDTO carteira) {
        checkIfExists(carteira.getNome(), carteira.getIdUsuario());

        Carteira saved = carteiraRepository.save(carteiraMapper.toEntity(carteira));
        return carteiraMapper.convert(saved);
    }

    public List<CarteiraListagemDTO> findAllByUsuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario currentUser = (Usuario) authentication.getPrincipal();

        List<Carteira> all = carteiraRepository.findAllByUsuarioIdAndExcluidoIsFalse(currentUser.getId());

        return all.stream().map(CarteiraListagemDTO::new).toList();
    }

    public Carteira findById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario currentUser = (Usuario) authentication.getPrincipal();
        return carteiraRepository.findByIdAndUsuarioIdAndExcluidoIsFalse(id, currentUser.getId()).orElseThrow(() -> new BadRequestException("Carteira não encontrada na base de dados desse usuário."));
    }

    @Transactional
    public void deleteCarteiraIfEmpty(Long idCarteira) {
        Carteira carteira = findById(idCarteira);

        boolean hasAcoes = carteiraAcaoRepository.existsByCarteira(carteira);

        if (hasAcoes) {
            log.info("Não é possível excluir a carteira pois ela contém ações");

            throw new BadRequestException("Não é possível excluir a carteira pois ela contém ações");
        }

        boolean hasTransacoes = historicoTransacaoRepository.existsByCarteira(carteira);
        if (hasTransacoes) {
            carteira.setExcluido(true);
            carteiraRepository.save(carteira);
        } else {
            carteiraRepository.delete(carteira);
        }
    }

    public CarteiraDetailDTO findCarteiraDetails(Long idCarteira) {
        Carteira carteira = findById(idCarteira);
        return carteiraMapper.convertToDetailDTO(carteira);
    }

    public CarteiraDTO update(CarteiraToUpdateDTO carteira) {
        Optional<Carteira> optional = carteiraRepository.findByIdAndUsuarioIdAndExcluidoIsFalse(carteira.getIdCarteira(), carteira.getIdUsuario());
        if (optional.isEmpty()) {
            log.info("Carteira não encontrada");
            throw new BadRequestException("Carteira não encontrada");
        }

        Carteira carteiraDb = optional.get();

        checkIfExists(carteira.getNome(), carteira.getIdUsuario());
        carteiraDb.setNome(carteira.getNome());

        Carteira updated = carteiraRepository.save(carteiraDb);
        return carteiraMapper.convert(updated);
    }

    private void checkIfExists(String nome, Long idUsuario) {
        Optional<Carteira> optional = carteiraRepository.findByNomeAndUsuarioIdAndExcluidoIsFalse(nome, idUsuario);
        if (optional.isPresent()) {
            log.info("Carteira já existe para esse usuário");
            throw new EntityAlreadyExistsException("Carteira já existe para esse usuário");
        }
    }

}
