package com.software.engineering.share.plus.mapper;

import com.software.engineering.share.plus.dto.HistoricoComprasDTO;
import com.software.engineering.share.plus.dto.UsuarioDTO;
import com.software.engineering.share.plus.model.HistoricoCompras;
import com.software.engineering.share.plus.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HistoricoComprasMapper {

    HistoricoComprasDTO convertDTO(HistoricoCompras historicoCompras);
}
