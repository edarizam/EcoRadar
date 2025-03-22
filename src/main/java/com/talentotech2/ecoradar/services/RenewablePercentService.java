package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.dto.PercentageDataDTO;
import com.talentotech2.ecoradar.repositories.RenewablePercentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RenewablePercentService {

    @Autowired
    private RenewablePercentRepository renewablePercentRepository;
    private final Pageable pageable = PageRequest.of(
            0,
            10,
            Sort.by("renewablePercent").descending());

    public List<PercentageDataDTO> findRenewablePercentByLocationAndRangeYear(Integer locationId, int startYear, int endYear) {
        return renewablePercentRepository.findRenewablePercentByLocationAndRangeYear(locationId, startYear, endYear);
    }

    public List<PercentageDataDTO> findTop10RenewablePercent(int year) {
        return renewablePercentRepository.findTop10RenewablePercent(year, pageable);
    }
}
