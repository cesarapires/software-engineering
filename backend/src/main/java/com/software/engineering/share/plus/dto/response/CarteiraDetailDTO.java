package com.software.engineering.share.plus.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CarteiraDetailDTO {
    private Long id;
    private String nome;
    private Double total;
    private List<CarteiraAcaoDTO> carteiraAcoes;
}
