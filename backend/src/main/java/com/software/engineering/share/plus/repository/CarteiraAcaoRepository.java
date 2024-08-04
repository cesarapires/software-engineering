package com.software.engineering.share.plus.repository;

import com.software.engineering.share.plus.entity.Acao;
import com.software.engineering.share.plus.entity.Carteira;
import com.software.engineering.share.plus.entity.CarteiraAcao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarteiraAcaoRepository extends JpaRepository<CarteiraAcao, Long> {

    Optional<CarteiraAcao> findByCarteiraIsAndAcaoIs(Carteira carteira, Acao acao);

    boolean existsByCarteira(Carteira carteira);
}
