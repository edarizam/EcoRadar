package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.models.SolarCapacity;
import com.talentotech2.ecoradar.repositories.SolarCapacityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolarCapacityService {

    @Autowired
    private SolarCapacityRepository solarCapacityRepository;

    private final Pageable pageable = PageRequest.of(
            0,
            10,
            Sort.by("solarCapacityPercent").descending());

    List<SolarCapacity> findSolarCapacityByLocationAndRangeYear(Integer locationId, int startYear, int endYear) {
        return  solarCapacityRepository.findSolarCapacityByLocationAndRangeYear(locationId, startYear, endYear);
    }

    List<SolarCapacity> findTop10SolarCapacityByYear(int year) {
        return  solarCapacityRepository.findTop10SolarCapacityByYear(year, pageable);
    }
}
