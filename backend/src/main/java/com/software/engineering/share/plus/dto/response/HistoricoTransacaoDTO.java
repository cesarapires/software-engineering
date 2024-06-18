package com.software.engineering.share.plus.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HistoricoTransacaoDTO {

    private Long id;
    private AcaoDTO acao;
    private LocalDateTime dataTransacao;
    private Integer quantidade;
    private Double valor;
}
