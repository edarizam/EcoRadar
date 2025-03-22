package com.talentotech2.ecoradar.services;

import com.talentotech2.ecoradar.models.Region;
import com.talentotech2.ecoradar.repositories.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionService {

    @Autowired
    private RegionRepository regionRepository;

    public List<Region> getAllRegions() {
        return regionRepository.findAll();
    }
}
