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

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "carteira_acao", schema = "share_plus")
public class CarteiraAcao implements Serializable {

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

    public double getTotal() {
        return acao.getPreco() * quantidade;
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
