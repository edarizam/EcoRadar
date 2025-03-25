package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.dto.LocationDataDTO;
import com.talentotech2.ecoradar.dto.YearDataDTO;
import com.talentotech2.ecoradar.repositories.ProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionService {

    @Autowired
    private ProductionRepository productionRepository;

    public List<DefaultDataDTO> findProductionByLocationAndYearsRange(Integer locationId, int startYear, int endYear) {
        return productionRepository.findProductionByLocationAndYearsRange(locationId, startYear, endYear);
    }

    public List<DefaultDataDTO> findTop10ProductionByYearAndSource(int year, Sort sort) {
        return productionRepository.findTop10ProductionByYear(year, sort);
    }

    public List<YearDataDTO> findYearsByLocationId(Integer locationId) {
        return productionRepository.findYearsAvailableByLocation(locationId);
    }

    public List<Integer> findYearsAvailableToRank() {
        return productionRepository.findYearsAvailableToRank();
    }

    public List<LocationDataDTO> findLocationsAvailable() {
        return productionRepository.findLocationsAvailable();
    }

    public List<LocationDataDTO> findLocationsAvailableByRegion(Integer regionId) {
        return productionRepository.findLocationsAvailableByRegion(regionId);
    }

}
