package com.talentotech2.ecoradar.repositories;


import com.talentotech2.ecoradar.models.SolarCapacity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolarCapacityRepository extends JpaRepository<SolarCapacity, Integer> {

    @Query("SELECT s " +
            "FROM SolarCapacity s " +
            "LEFT JOIN s.location l " +
            "LEFT JOIN s.year y " +
            "WHERE y.year BETWEEN :startYear AND :endYear " +
            "AND l.id = :locationId")
    List<SolarCapacity> findSolarCapacityByLocationAndRangeYear(
            @Param("locationId") Integer locationId,
            @Param("startYear") int startYear,
            @Param("endYear") int endYear);

}
