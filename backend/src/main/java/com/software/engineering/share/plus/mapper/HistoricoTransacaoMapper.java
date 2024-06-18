package com.software.engineering.share.plus.mapper;

import com.software.engineering.share.plus.dto.response.HistoricoTransacaoDTO;
import com.software.engineering.share.plus.model.HistoricoTransacao;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HistoricoTransacaoMapper {

    HistoricoTransacaoDTO convertDTO(HistoricoTransacao historicoTransacao);
}
