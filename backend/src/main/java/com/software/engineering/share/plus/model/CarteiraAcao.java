package com.software.engineering.share.plus.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "carteira_acao", schema = "share_plus")
public class CarteiraAcao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_carteira", nullable = false)
    private Carteira carteira;

    @ManyToOne
    @JoinColumn(name = "id_acao", nullable = false)
    private Acao acao;

    @Column(nullable = false)
    private Integer quantidade;
}
