package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.LocationDataDTO;
import com.talentotech2.ecoradar.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500/")
@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/region/{regionId}")
    public List<LocationDataDTO> findLocationsByRegionId(@PathVariable Integer regionId) {
        return locationService.findLocationsByRegionId(regionId);
    }
}
