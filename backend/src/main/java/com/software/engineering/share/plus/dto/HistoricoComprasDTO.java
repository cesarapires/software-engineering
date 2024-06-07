package com.software.engineering.share.plus.dto;

import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HistoricoComprasDTO {

    private Long id;
    private Usuario usuario;
    private Acao acao;
    private LocalDateTime dataCompra;
    private Integer quantidade;
    private Double valor;
}
