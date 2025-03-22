package com.talentotech2.ecoradar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PercentageDataDTO {
    private String location;
    private int year;
    private Double percent;
}
