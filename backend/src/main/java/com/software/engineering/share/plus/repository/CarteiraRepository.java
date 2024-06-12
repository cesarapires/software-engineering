package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.model.Carteira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarteiraRepository extends JpaRepository<Carteira, Long> {
    Optional<Carteira> findByNomeAndUsuarioId(String nome, Long idUsuario);
    List<Carteira> findAllByUsuarioId(Long idUsuario);
}
