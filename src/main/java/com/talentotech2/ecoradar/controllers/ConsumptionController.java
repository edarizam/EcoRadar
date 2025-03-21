package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.models.Consumption;
import com.talentotech2.ecoradar.services.ConsumptionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/consumption")
public class ConsumptionController {

    @Autowired
    private ConsumptionServices consumptionServices;

    @GetMapping("/compare/{locationId}/{startYear}/{endYear}")
    public List<DefaultDataDTO> findConsumptionByLocationAndYearsRange(
            @PathVariable Integer locationId,
            @PathVariable int startYear,
            @PathVariable int endYear) {
        return consumptionServices.findConsumptionByLocationAndYearsRange(locationId, startYear, endYear);
    }

    @GetMapping("/hranking/{year}")
    public List<DefaultDataDTO> findTop10HydroConsumptionsByYear(@PathVariable int year) {
        return consumptionServices.findTop10HydroConsumptionsByYear(year);
    }

    @GetMapping("/wranking/{year}")
    public List<DefaultDataDTO> findTop10WindConsumptionsByYear(@PathVariable int year) {
        return consumptionServices.findTop10WindConsumptionsByYear(year);
    }

    @GetMapping("/sranking/{year}")
    public List<DefaultDataDTO> findTop10SolarConsumptionsByYear(@PathVariable int year) {
        return consumptionServices.findTop10SolarConsumptionsByYear(year);
    }

    @GetMapping("/branking/{year}")
    public List<DefaultDataDTO> findTop10BioAndOtherConsumptionsByYear(@PathVariable int year) {
        return consumptionServices.findTop10BioAndOtherConsumptionsByYear(year);
    }
}
