package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.services.ProductionService;
import com.talentotech2.ecoradar.util.DefaultPageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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

    @GetMapping("/{source}/ranking/{year}")
    public List<DefaultDataDTO> findTop10ProductionsByYear(
            @PathVariable int year, @PathVariable String source) {

        DefaultPageable pageable = getPageableBySource(source);
        return productionService.findTop10ProductionByYearAndSource(year, pageable.getPageable());
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
