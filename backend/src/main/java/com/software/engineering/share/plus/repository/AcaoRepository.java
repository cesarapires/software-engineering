package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.dto.response.AcaoDTO;
import com.software.engineering.share.plus.dto.response.AcaoListagemDTO;
import com.software.engineering.share.plus.model.Acao;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {

    @Query("SELECT new com.software.engineering.share.plus.dto.response.AcaoDTO(a.id, a.nome, a.codigo, a.logo, a.preco) " +
            "FROM Acao a WHERE a.codigo LIKE %:codigo%")
    List<AcaoDTO> findByCodigoContaining(String codigo);

    @Query("SELECT new com.software.engineering.share.plus.dto.response.AcaoListagemDTO(a.nome, a.codigo, a.preco) " +
            "FROM Acao a")
    List<AcaoListagemDTO> findAllDTO();

    Acao findByCodigo(String codigo);
}
