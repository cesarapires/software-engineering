package com.software.engineering.share.plus.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "acao", schema = "share_plus")
public class Acao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String codigo;

    @Column(nullable = false)
    private String nome;

    @Column
    private String logo;

    @OneToMany(mappedBy = "acao")
    private Set<CarteiraAcao> carteiraAcoes;

    @OneToMany(mappedBy = "acao")
    private Set<HistoricoCompras> historicoCompras;
}
