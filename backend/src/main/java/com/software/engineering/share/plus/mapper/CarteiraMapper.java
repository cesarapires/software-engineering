package com.software.engineering.share.plus.mapper;

import com.software.engineering.share.plus.dto.request.CarteiraToSaveDTO;
import com.software.engineering.share.plus.dto.response.CarteiraDTO;
import com.software.engineering.share.plus.model.Carteira;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.core.convert.converter.Converter;

@Mapper(componentModel = "spring", uses = UsuarioMapper.class)
public interface CarteiraMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "carteiraAcoes", ignore = true)
    @Mapping(target = "usuario", source = "idUsuario")
    Carteira toEntity(CarteiraToSaveDTO carteira);

    CarteiraDTO convert(Carteira carteira);
}
