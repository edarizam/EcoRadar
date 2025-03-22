package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.dto.LocationDataDTO;
import com.talentotech2.ecoradar.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<LocationDataDTO> findLocationsByRegionId(Integer regionId) {
        return locationRepository.findLocationsByRegionId(regionId);
    }
}
