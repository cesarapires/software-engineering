package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.model.CarteiraAcao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarteiraAcaoRepository extends JpaRepository<CarteiraAcao, Long> {
}
