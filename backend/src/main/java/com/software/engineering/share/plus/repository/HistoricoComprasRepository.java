package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.model.HistoricoCompras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoComprasRepository extends JpaRepository<HistoricoCompras, Long> {
}
