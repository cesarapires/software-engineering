package com.software.engineering.share.plus.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RelatorioTransacoesDTO {
    private LocalDateTime dataTransacao;
    private boolean flCompra;
    private String acao;
    private int quantidade;
    private double valor;
}
