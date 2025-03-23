package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.PercentageDataDTO;
import com.talentotech2.ecoradar.dto.YearDataDTO;
import com.talentotech2.ecoradar.services.SolarCapacityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/percents/solar")
public class SolarCapacityController {

    @Autowired
    private SolarCapacityService solarCapacityService;

    @GetMapping("/compare/{locationId}/{startYear}/{endYear}")
    List<PercentageDataDTO> findSolarCapacityByLocationAndRangeYear(
            @PathVariable Integer locationId,
            @PathVariable int startYear,
            @PathVariable int endYear) {
        return  solarCapacityService.findSolarCapacityByLocationAndRangeYear(locationId, startYear, endYear);
    }

    @GetMapping("/year/{locationId}")
    public List<YearDataDTO> findYearsAvailableByLocationId(@PathVariable Integer locationId) {
        return solarCapacityService.findYearsByLocationId(locationId);
    }

    @GetMapping("/ranking/best/{year}")
    List<PercentageDataDTO> findTop10SolarCapacityByYear(@PathVariable int year) {
        return  solarCapacityService.findTop10SolarCapacityByYear(year);
    }
}
