package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.models.Production;
import com.talentotech2.ecoradar.repositories.ProductionRepository;
import com.talentotech2.ecoradar.utils.DefaultPageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionService {

    @Autowired
    private ProductionRepository productionRepository;

    public List<Production> findProductionByLocationAndYearsRange(Integer locationId, int startYear, int endYear) {
        return productionRepository.findProductionByLocationAndYearsRange(locationId, startYear, endYear);
    }

    public List<Production> findTop10WindConsumptionByYear(int year) {
        return productionRepository.findTop10ConsumptionByYear(year, DefaultPageable.TOP_10_WIND.getPageable());
    }

    public List<Production> findTop10HydroConsumptionByYear(int year) {
        return productionRepository.findTop10ConsumptionByYear(year, DefaultPageable.TOP_10_HYDRO.getPageable());
    }

    public List<Production> findTop10SolarConsumptionByYear(int year) {
        return productionRepository.findTop10ConsumptionByYear(year, DefaultPageable.TOP_10_SOLAR.getPageable());
    }

    public List<Production> findTop10BioAndOtherConsumptionByYear(int year) {
        return productionRepository.findTop10ConsumptionByYear(year, DefaultPageable.TOP_10_BIO_AND_OTHER.getPageable());
    }
}
