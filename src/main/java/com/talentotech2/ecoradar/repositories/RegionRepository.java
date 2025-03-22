package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionRepository extends JpaRepository<Region, Integer> {

}
