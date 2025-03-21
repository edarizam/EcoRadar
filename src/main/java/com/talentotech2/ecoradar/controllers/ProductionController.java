package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.services.ProductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/production")
public class ProductionController {

    @Autowired
    private ProductionService productionService;

    @GetMapping("/compare/{locationId}/{startYear}/{endYear}")
    public List<DefaultDataDTO> findProductionByLocationAndYearsRange(
            @PathVariable Integer locationId,
            @PathVariable int startYear,
            @PathVariable int endYear) {
        return productionService.findProductionByLocationAndYearsRange(locationId, startYear, endYear);
    }

    @GetMapping("/wranking/{year}")
    public List<DefaultDataDTO> findTop10WindProductionByYear(@PathVariable int year) {
        return productionService.findTop10WindProductionByYear(year);
    }

    @GetMapping("/hranking/{year}")
    public List<DefaultDataDTO> findTop10HydroProductionByYear(@PathVariable int year) {
        return productionService.findTop10HydroProductionByYear(year);
    }

    @GetMapping("/sranking/{year}")
    public List<DefaultDataDTO> findTop10SolarProductionByYear(@PathVariable int year) {
        return productionService.findTop10SolarProductionByYear(year);
    }

    @GetMapping("/branking/{year}")
    public List<DefaultDataDTO> findTop10BioAndOtherProductionByYear(@PathVariable int year) {
        return productionService.findTop10BioAndOtherProductionByYear(year);
    }


}
