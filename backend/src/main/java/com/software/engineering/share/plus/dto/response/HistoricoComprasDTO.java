package com.software.engineering.share.plus.dto.response;

import com.software.engineering.share.plus.model.Acao;
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
    private AcaoDTO acao;
    private LocalDateTime dataCompra;
    private Integer quantidade;
    private Double valor;
}
