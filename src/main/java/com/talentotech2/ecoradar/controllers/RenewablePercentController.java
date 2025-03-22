package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.PercentageDataDTO;
import com.talentotech2.ecoradar.services.RenewablePercentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/percents")
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

    @GetMapping("/ranking/best/{year}")
    List<PercentageDataDTO> findTop10RenewablePercent(@PathVariable int year) {
        return renewablePercentService.findTop10RenewablePercent(year);
    }

}
