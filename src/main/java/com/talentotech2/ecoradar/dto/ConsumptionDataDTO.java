package com.talentotech2.ecoradar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConsumptionDataDTO {
    private String location;
    private int year;
    private Double hydroData;
    private Double windData;
    private Double bioAndOtherData;
    private Double solarData;
}
