package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.models.Location;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

    @Query("SELECT l FROM Location l WHERE l.region.id = :regionId")
    List<Location> findLocationsByRegionId(@Param("regionId") Integer regionId);
}
