package com.software.engineering.share.plus.mapper;

import com.software.engineering.share.plus.dto.response.HistoricoTransacaoDTO;
import com.software.engineering.share.plus.entity.HistoricoTransacao;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HistoricoTransacaoMapper {

    HistoricoTransacaoDTO convertDTO(HistoricoTransacao historicoTransacao);
}
