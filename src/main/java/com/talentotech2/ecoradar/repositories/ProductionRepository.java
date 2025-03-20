package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.models.Production;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionRepository extends JpaRepository<Production, Integer> {
}
