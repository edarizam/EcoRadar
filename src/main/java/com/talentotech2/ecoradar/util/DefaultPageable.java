package com.talentotech2.ecoradar.util;

import lombok.Getter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public enum DefaultPageable {
    WIND(Sort.by("windData").descending()),
    SOLAR(Sort.by("solarData").descending()),
    HYDRO(Sort.by("hydroData").descending()),
    BIO_AND_OTHER(Sort.by("bioAndOtherData").descending());

    private final Sort sort;

    DefaultPageable(Sort sort) {
        this.sort = sort;
    }

    public Sort getSort() {
        return sort;
    }
}

