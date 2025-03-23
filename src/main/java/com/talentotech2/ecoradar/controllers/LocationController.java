package com.talentotech2.ecoradar.controllers;

import com.talentotech2.ecoradar.dto.LocationDataDTO;
import com.talentotech2.ecoradar.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/region/{regionId}")
    public List<LocationDataDTO> findLocationsByRegionId(@PathVariable Integer regionId) {
        return locationService.findLocationsByRegionId(regionId);
    }

    @GetMapping
    public List<LocationDataDTO> findAllLocations() {
        return locationService.findAllLocations();
    }
}
