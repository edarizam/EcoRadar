package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.dto.LocationDataDTO;
import com.talentotech2.ecoradar.dto.YearDataDTO;
import com.talentotech2.ecoradar.services.ProductionService;
import com.talentotech2.ecoradar.util.DefaultPageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500/")
@RestController
@RequestMapping("/production")
public class ProductionController {

    @Autowired
    private ProductionService productionService;

    @GetMapping("/location")
    List<LocationDataDTO> findLocationsAvailable() {
        return productionService.findLocationsAvailable();
    }

    @GetMapping("/location/{regionId}")
    List<LocationDataDTO> findLocationsAvailableByRegion(@PathVariable Integer regionId) {
        return productionService.findLocationsAvailableByRegion(regionId);
    }

    @GetMapping("/compare/{locationId}/{startYear}/{endYear}")
    public List<DefaultDataDTO> findProductionByLocationAndYearsRange(
            @PathVariable Integer locationId,
            @PathVariable int startYear,
            @PathVariable int endYear) {
        return productionService.findProductionByLocationAndYearsRange(locationId, startYear, endYear);
    }

    @GetMapping("/year/{locationId}")
    public List<YearDataDTO> findYearsAvailableByLocationId(@PathVariable Integer locationId) {
        return productionService.findYearsByLocationId(locationId);
    }

    @GetMapping("/year")
    public List<Integer> findYearsAvailableToRank() {
        return productionService.findYearsAvailableToRank();
    }

    @GetMapping("/{source}/ranking/{year}")
    public List<DefaultDataDTO> findTop10ProductionsByYear(
            @PathVariable int year, @PathVariable String source) {

        DefaultPageable pageable = getPageableBySource(source);
        return productionService.findTop10ProductionByYearAndSource(year, pageable.getSort());
    }

    private DefaultPageable getPageableBySource(String source) {
        return switch (source.toLowerCase()) {
            case "hydro" -> DefaultPageable.HYDRO;
            case "wind" -> DefaultPageable.WIND;
            case "solar" -> DefaultPageable.SOLAR;
            case "bio" -> DefaultPageable.BIO_AND_OTHER;
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de fuente no válida");
        };
    }



}
