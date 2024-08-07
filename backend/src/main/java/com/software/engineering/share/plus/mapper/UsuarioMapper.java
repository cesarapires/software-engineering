package com.software.engineering.share.plus.mapper;

import com.software.engineering.share.plus.dto.response.UsuarioDTO;
import com.software.engineering.share.plus.entity.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {HistoricoTransacaoMapper.class})
public interface UsuarioMapper {

    UsuarioDTO convert(Usuario usuario);

    default Usuario references(Long id) {
        return new Usuario(id);
    }
}
