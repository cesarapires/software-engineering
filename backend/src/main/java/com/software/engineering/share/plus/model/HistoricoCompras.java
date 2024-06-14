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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "historico_compras", schema = "share_plus")
@Getter
@Setter
public class HistoricoCompras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_acao", nullable = false)
    private Acao acao;

    @Column(name = "data_compra", nullable = false)
    private LocalDateTime dataCompra;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private Double valor;

    public HistoricoCompras(CarteiraAcao carteiraAcao) {
        this.usuario = carteiraAcao.getCarteira().getUsuario();
        this.acao = carteiraAcao.getAcao();
        this.dataCompra = LocalDateTime.now();
        this.quantidade = carteiraAcao.getQuantidade();
        this.valor = carteiraAcao.getQuantidade() * carteiraAcao.getAcao().getPreco();
    }
}