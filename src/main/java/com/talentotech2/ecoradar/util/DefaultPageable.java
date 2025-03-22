package com.talentotech2.ecoradar.util;

import lombok.Getter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Getter
public enum DefaultPageable {
    TOP_10_WIND(PageRequest.of(0, 10, Sort.by("windData").descending())),
    TOP_10_SOLAR(PageRequest.of(0, 10, Sort.by("solarData").descending())),
    TOP_10_HYDRO(PageRequest.of(0, 10, Sort.by("hydroData").descending())),
    TOP_10_BIO_AND_OTHER(PageRequest.of(0, 10, Sort.by("bioAndOtherData").descending()));

    private final Pageable pageable;

    DefaultPageable(Pageable pageable) {
        this.pageable = pageable;
    }

}
