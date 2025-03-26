package com.talentotech2.ecoradar.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Sort;

@AllArgsConstructor
@Getter
public enum DefaultPageable {
    WIND(Sort.by("windData").descending()),
    SOLAR(Sort.by("solarData").descending()),
    HYDRO(Sort.by("hydroData").descending()),
    BIO_AND_OTHER(Sort.by("bioAndOtherData").descending());

    private final Sort sort;
}

