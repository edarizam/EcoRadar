package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.models.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsumptionRepository extends JpaRepository<Consumption, Integer> {
}
