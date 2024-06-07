package com.software.engineering.share.plus.mapper;

import com.software.engineering.share.plus.dto.UsuarioDTO;
import com.software.engineering.share.plus.model.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = HistoricoComprasMapper.class)
public interface UsuarioMapper {

    UsuarioDTO convertDTO(Usuario usuario);
}
