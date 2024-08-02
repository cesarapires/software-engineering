package com.software.engineering.share.plus.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CarteiraAcaoDTO {
    private AcaoMinimalDTO acao;
    private String quantidade;
    private String total;
}
