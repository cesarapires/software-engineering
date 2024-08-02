package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.model.Carteira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarteiraRepository extends JpaRepository<Carteira, Long> {
    Optional<Carteira> findByNomeAndUsuarioIdAndExcluidoIsFalse(String nome, Long idUsuario);
    List<Carteira> findAllByUsuarioIdAndExcluidoIsFalse(Long idUsuario);
    Optional<Carteira> findByIdAndUsuarioIdAndExcluidoIsFalse(Long id, Long idUsuario);
}
