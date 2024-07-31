package com.software.engineering.share.plus.dto.response;

import com.software.engineering.share.plus.model.Carteira;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CarteiraListagem {
    private Long id;
    private String nome;
    private Double total;

    public CarteiraListagem(Carteira carteira) {
        this.id = carteira.getId();
        this.nome = carteira.getNome();
        this.total = carteira.getTotal();
    }
}
