package com.software.engineering.share.plus.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AcaoListagemDTO {
    private Long id;
    private String nome;
    private String codigo;
    private Double preco;
    private String setor;
}
