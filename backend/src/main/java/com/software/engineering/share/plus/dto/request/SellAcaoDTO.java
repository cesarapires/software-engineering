package com.software.engineering.share.plus.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SellAcaoDTO {
    private Long idAcao;
    private Long idCarteira;
    private Integer quantidade;
}
