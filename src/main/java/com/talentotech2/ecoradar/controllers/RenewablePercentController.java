package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.LocationDataDTO;
import com.talentotech2.ecoradar.dto.PercentageDataDTO;
import com.talentotech2.ecoradar.dto.YearDataDTO;
import com.talentotech2.ecoradar.services.RenewablePercentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500/")
@RestController
@RequestMapping("/renewable")
public class RenewablePercentController {

    @Autowired
    RenewablePercentService renewablePercentService;

    @GetMapping("/compare/{locationId}/{startYear}/{endYear}")
    List<PercentageDataDTO> findRenewablePercentByLocationAndRangeYear(
            @PathVariable Integer locationId,
            @PathVariable int startYear,
            @PathVariable int endYear) {
        return renewablePercentService.findRenewablePercentByLocationAndRangeYear(locationId, startYear, endYear);
    }

    @GetMapping("/year/{locationId}")
    public List<YearDataDTO> findYearsAvailableByLocationId(@PathVariable Integer locationId) {
        return renewablePercentService.findYearsByLocationId(locationId);
    }

    @GetMapping("/ranking/best/{year}")
    List<PercentageDataDTO> findTop10RenewablePercent(@PathVariable int year) {
        return renewablePercentService.findTop10RenewablePercent(year);
    }

    @GetMapping("/location")
    List<LocationDataDTO> findLocationsAvailable() {
        return renewablePercentService.findLocationsAvailable();
    }

    @GetMapping("/location/{regionId}")
    List<LocationDataDTO> findLocationsAvailableByRegion(@PathVariable Integer regionId) {
        return renewablePercentService.findLocationsAvailableByRegion(regionId);
    }

}
