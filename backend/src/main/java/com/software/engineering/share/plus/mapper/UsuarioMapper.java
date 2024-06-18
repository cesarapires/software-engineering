package com.software.engineering.share.plus.mapper;

import com.software.engineering.share.plus.dto.response.UsuarioDTO;
import com.software.engineering.share.plus.model.Usuario;
import org.mapstruct.Mapper;
import org.springframework.core.convert.converter.Converter;

@Mapper(componentModel = "spring", uses = {HistoricoTransacaoMapper.class})
public interface UsuarioMapper extends Converter<Usuario, UsuarioDTO> {

    UsuarioDTO convert(Usuario usuario);

    default Usuario references(Long id) {
        return new Usuario(id);
    }
}
