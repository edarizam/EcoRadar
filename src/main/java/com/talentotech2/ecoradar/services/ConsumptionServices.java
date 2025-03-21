package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.repositories.ConsumptionRepository;
import com.talentotech2.ecoradar.utils.DefaultPageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsumptionServices {
    @Autowired
    private ConsumptionRepository consumptionRepository;

    public List<DefaultDataDTO> findConsumptionByLocationAndYearsRange(Integer locationId, int startYear, int endYear) {
        return consumptionRepository.findConsumptionByLocationAndYearsRange(locationId, startYear, endYear);
    }

    public List<DefaultDataDTO> findTop10HydroConsumptionsByYear(int year) {
        return consumptionRepository.findTop10ConsumptionsByYear(year, DefaultPageable.TOP_10_HYDRO.getPageable());
    }

    public List<DefaultDataDTO> findTop10WindConsumptionsByYear(int year) {
        return consumptionRepository.findTop10ConsumptionsByYear(year, DefaultPageable.TOP_10_WIND.getPageable());
    }

    public List<DefaultDataDTO> findTop10SolarConsumptionsByYear(int year) {
        return consumptionRepository.findTop10ConsumptionsByYear(year, DefaultPageable.TOP_10_SOLAR.getPageable());
    }

    public List<DefaultDataDTO> findTop10BioAndOtherConsumptionsByYear(int year) {
        return consumptionRepository.findTop10ConsumptionsByYear(year, DefaultPageable.TOP_10_BIO_AND_OTHER.getPageable());
    }

}
