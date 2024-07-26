package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.dto.response.AcaoDTO;
import com.software.engineering.share.plus.model.Acao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {

    @Query("SELECT new com.software.engineering.share.plus.dto.response.AcaoDTO(a.id, a.nome, a.codigo, a.logo) " +
            "FROM Acao a WHERE a.codigo LIKE %:codigo%")
    Page<AcaoDTO> findByCodigoContaining(String codigo, Pageable pageable);
}
