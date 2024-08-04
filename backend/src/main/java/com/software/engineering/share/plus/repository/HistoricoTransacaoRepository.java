package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.dto.response.RelatorioTransacoesDTO;
import com.software.engineering.share.plus.entity.Carteira;
import com.software.engineering.share.plus.entity.HistoricoTransacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoTransacaoRepository extends JpaRepository<HistoricoTransacao, Long> {
    boolean existsByCarteira(Carteira carteiraId);

    @Query("SELECT new com.software.engineering.share.plus.dto.response.RelatorioTransacoesDTO(ht.dataTransacao, ht.isCompra, a.codigo, ht.quantidade, ht.valor) " +
            "FROM HistoricoTransacao ht " +
            "JOIN ht.acao a " +
            "WHERE ht.usuario.id = :idUsuario AND ht.carteira.id = :idCarteira")
    List<RelatorioTransacoesDTO> findTransacoes(@Param("idUsuario") Long idUsuario, @Param("idCarteira") Long idCarteira);

    List<HistoricoTransacao> findAllByCarteiraId(Long carteiraId);
}
