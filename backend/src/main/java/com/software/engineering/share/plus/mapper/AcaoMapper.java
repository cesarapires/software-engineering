package com.software.engineering.share.plus.mapper;

import com.software.engineering.share.plus.dto.response.AcaoDTO;
import com.software.engineering.share.plus.dto.response.CarteiraDTO;
import com.software.engineering.share.plus.entity.Acao;
import com.software.engineering.share.plus.entity.Carteira;
import org.mapstruct.Mapper;
import org.springframework.core.convert.converter.Converter;

@Mapper(componentModel = "spring")
public interface AcaoMapper extends Converter<Carteira, CarteiraDTO> {

    AcaoDTO convert(Acao acao);

}
