package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.dto.PercentageDataDTO;
import com.talentotech2.ecoradar.dto.YearDataDTO;
import com.talentotech2.ecoradar.repositories.SolarCapacityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolarCapacityService {

    @Autowired
    private SolarCapacityRepository solarCapacityRepository;

    private final Pageable pageable = PageRequest.of(
            0,
            10,
            Sort.by("percent").descending());

    public List<PercentageDataDTO> findSolarCapacityByLocationAndRangeYear(Integer locationId, int startYear, int endYear) {
        return  solarCapacityRepository.findSolarCapacityByLocationAndRangeYear(locationId, startYear, endYear);
    }

    public List<PercentageDataDTO> findTop10SolarCapacityByYear(int year) {
        return  solarCapacityRepository.findTop10SolarCapacityByYear(year, pageable);
    }

    public List<YearDataDTO> findYearsByLocationId(int year) {
        return solarCapacityRepository.findYearsAvailableByLocation(year);
    }
}
