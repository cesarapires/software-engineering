package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.model.HistoricoTransacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoTransacaoRepository extends JpaRepository<HistoricoTransacao, Long> {
}
