package com.software.engineering.share.plus.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsuarioDTO {
    private String nome;
    private String email;
    private Double saldo;
    private Set<HistoricoComprasDTO> historicoCompras;
}
