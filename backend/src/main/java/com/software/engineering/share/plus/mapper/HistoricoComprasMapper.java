package com.software.engineering.share.plus.mapper;

import com.software.engineering.share.plus.dto.response.HistoricoComprasDTO;
import com.software.engineering.share.plus.model.HistoricoCompras;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HistoricoComprasMapper {

    HistoricoComprasDTO convertDTO(HistoricoCompras historicoCompras);
}
