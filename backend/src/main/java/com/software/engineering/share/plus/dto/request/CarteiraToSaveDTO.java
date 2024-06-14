package com.software.engineering.share.plus.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarteiraToSaveDTO {
    private String nome;
    private Long idUsuario;
}
