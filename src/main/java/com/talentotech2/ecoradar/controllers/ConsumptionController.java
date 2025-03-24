package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.dto.YearDataDTO;
import com.talentotech2.ecoradar.services.ConsumptionServices;
import com.talentotech2.ecoradar.util.DefaultPageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500/")
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

    @GetMapping("/year/{locationId}")
    public List<YearDataDTO> findYearsAvailableByLocationId(@PathVariable Integer locationId) {
        return consumptionServices.findYearsByLocationId(locationId);
    }

    @GetMapping("/{source}/ranking/{year}")
    public List<DefaultDataDTO> findTop10ConsumptionsByYear(@PathVariable int year, @PathVariable String source) {
        DefaultPageable pageable = getPageableBySource(source);
        return consumptionServices.findTop10ConsumptionByYearAndSource(year, pageable.getPageable());
    }

    private DefaultPageable getPageableBySource(String source) {
        return switch (source.toLowerCase()) {
            case "hydro" -> DefaultPageable.TOP_10_HYDRO;
            case "wind" -> DefaultPageable.TOP_10_WIND;
            case "solar" -> DefaultPageable.TOP_10_SOLAR;
            case "bio" -> DefaultPageable.TOP_10_BIO_AND_OTHER;
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de fuente no válida");
        };
    }

}
