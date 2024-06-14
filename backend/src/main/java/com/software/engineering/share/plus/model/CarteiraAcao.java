package com.software.engineering.share.plus.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "carteira_acao", schema = "share_plus")
public class CarteiraAcao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_carteira", nullable = false)
    @JsonIgnore
    private Carteira carteira;

    @ManyToOne
    @JoinColumn(name = "id_acao", nullable = false)
    @JsonIgnore
    private Acao acao;

    @Column(nullable = false)
    private Integer quantidade;

    public CarteiraAcao(Integer quantidade, Acao acao, Carteira carteira) {
        this.quantidade = quantidade;
        this.acao = acao;
        this.carteira = carteira;
    }
}
