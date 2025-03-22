package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.dto.LocationDataDTO;
import com.talentotech2.ecoradar.models.Location;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

    @Query("SELECT new com.talentotech2.ecoradar.dto.LocationDataDTO(" +
            "l.id, l.name) " +
            "FROM Location l WHERE l.region.id = :regionId")
    List<LocationDataDTO> findLocationsByRegionId(@Param("regionId") Integer regionId);
}
