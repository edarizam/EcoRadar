package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.dto.LocationDataDTO;
import com.talentotech2.ecoradar.dto.YearDataDTO;
import com.talentotech2.ecoradar.repositories.ConsumptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConsumptionServices {
    @Autowired
    private ConsumptionRepository consumptionRepository;

    public List<DefaultDataDTO> findConsumptionByLocationAndYearsRange(Integer locationId, int startYear, int endYear) {
        return consumptionRepository.findConsumptionByLocationAndYearsRange(locationId, startYear, endYear);
    }

    public List<DefaultDataDTO> findTop10ConsumptionByYearAndSource(int year, Pageable pageable) {
        return consumptionRepository.findTop10ConsumptionsByYear(year, pageable);
    }

    public List<YearDataDTO> findYearsByLocationId(Integer locationId) {
        return consumptionRepository.findYearsAvailableByLocation(locationId);
    }

    public List<Integer> findYearsAvailableToRank() {
        return consumptionRepository.findYearsAvailableToRank();
    }

    public List<LocationDataDTO> findLocationsAvailable() {
        return consumptionRepository.findLocationsAvailable();
    }

    public List<LocationDataDTO> findLocationsAvailableByRegionId(Integer regionId) {
        return consumptionRepository.findLocationsAvailableByRegion(regionId);
    }

}
