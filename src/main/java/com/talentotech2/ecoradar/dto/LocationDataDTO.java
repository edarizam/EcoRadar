package com.talentotech2.ecoradar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class LocationDataDTO {
    private Integer id;
    private String name;
}
