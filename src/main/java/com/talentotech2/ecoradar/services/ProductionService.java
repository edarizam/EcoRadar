package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.repositories.ProductionRepository;
import com.talentotech2.ecoradar.utils.DefaultPageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionService {

    @Autowired
    private ProductionRepository productionRepository;

    public List<DefaultDataDTO> findProductionByLocationAndYearsRange(Integer locationId, int startYear, int endYear) {
        return productionRepository.findProductionByLocationAndYearsRange(locationId, startYear, endYear);
    }

    public List<DefaultDataDTO> findTop10WindProductionByYear(int year) {
        return productionRepository.findTop10ProductionByYear(year, DefaultPageable.TOP_10_WIND.getPageable());
    }

    public List<DefaultDataDTO> findTop10HydroProductionByYear(int year) {
        return productionRepository.findTop10ProductionByYear(year, DefaultPageable.TOP_10_HYDRO.getPageable());
    }

    public List<DefaultDataDTO> findTop10SolarProductionByYear(int year) {
        return productionRepository.findTop10ProductionByYear(year, DefaultPageable.TOP_10_SOLAR.getPageable());
    }

    public List<DefaultDataDTO> findTop10BioAndOtherProductionByYear(int year) {
        return productionRepository.findTop10ProductionByYear(year, DefaultPageable.TOP_10_BIO_AND_OTHER.getPageable());
    }
}
