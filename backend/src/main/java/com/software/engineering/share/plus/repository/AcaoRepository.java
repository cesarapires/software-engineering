package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.model.Acao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {
}
