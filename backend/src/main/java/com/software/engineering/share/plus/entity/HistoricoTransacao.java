package com.software.engineering.share.plus.entity;

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

import java.io.IOException;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "historico_transacao", schema = "share_plus")
@Getter
@Setter
public class HistoricoTransacao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_carteira", nullable = false)
    private Carteira carteira;

    @ManyToOne
    @JoinColumn(name = "id_acao", nullable = false)
    private Acao acao;

    @Column(name = "data_transacao", nullable = false)
    private LocalDateTime dataTransacao;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private Double valor;

    @Column(name = "fl_compra", nullable = false)
    private Boolean isCompra;

    public HistoricoTransacao(Carteira carteira, Acao acao, Integer quantidade, Double valor, boolean isCompra) {
        this.carteira = carteira;
        this.usuario = carteira.getUsuario();
        this.acao = acao;
        this.dataTransacao = LocalDateTime.now();
        this.quantidade = quantidade;
        this.valor = valor;
        this.isCompra = isCompra;
    }

    @Serial
    private void writeObject(java.io.ObjectOutputStream stream)
            throws IOException {
        stream.defaultWriteObject();
    }

    @Serial
    private void readObject(java.io.ObjectInputStream stream)
            throws IOException, ClassNotFoundException {
        stream.defaultReadObject();
    }
}