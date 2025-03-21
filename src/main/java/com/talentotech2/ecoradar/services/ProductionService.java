package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.repositories.ProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionService {

    @Autowired
    private ProductionRepository productionRepository;

    public List<DefaultDataDTO> findProductionByLocationAndYearsRange(Integer locationId, int startYear, int endYear) {
        return productionRepository.findProductionByLocationAndYearsRange(locationId, startYear, endYear);
    }

    public List<DefaultDataDTO> findTop10ProductionByYearAndSource(int year, Pageable pageable) {
        return productionRepository.findTop10ProductionByYear(year, pageable);
    }
}
