package com.software.engineering.share.plus.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Stock {
    private String stock;
    private String name;
    private Double close;
    private Double change;
    private long volume;
    private Double marketCap;
    private String logo;
    private String sector;
    private String type;
}
