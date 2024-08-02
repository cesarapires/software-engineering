package com.software.engineering.share.plus.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockDetailDTO {
    private String shortName;
    private String longName;
    private String symbol;
    private String logourl;
    private List<HistoricalDataPriceDTO> historicalDataPrice;
    private Double close;
    private String sector;
}
