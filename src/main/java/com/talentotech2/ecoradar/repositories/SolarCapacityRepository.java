package com.talentotech2.ecoradar.repositories;


import com.talentotech2.ecoradar.models.SolarCapacity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolarCapacityRepository extends JpaRepository<SolarCapacity, Integer> {
}
