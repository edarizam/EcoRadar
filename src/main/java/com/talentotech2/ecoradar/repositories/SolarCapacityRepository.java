package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.dto.PercentageDataDTO;
import com.talentotech2.ecoradar.model.SolarCapacity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolarCapacityRepository extends JpaRepository<SolarCapacity, Integer> {

    @Query("SELECT new com.talentotech2.ecoradar.dto.PercentageDataDTO(" +
            "l.name, y.year, s.percent) " +
            "FROM SolarCapacity s " +
            "LEFT JOIN s.location l " +
            "LEFT JOIN s.year y " +
            "WHERE y.year BETWEEN :startYear AND :endYear " +
            "AND l.id = :locationId")
    List<PercentageDataDTO> findSolarCapacityByLocationAndRangeYear(
            @Param("locationId") Integer locationId,
            @Param("startYear") int startYear,
            @Param("endYear") int endYear);

    @Query("SELECT new com.talentotech2.ecoradar.dto.PercentageDataDTO(" +
            "s.location.name, s.year.year, s.percent) " +
            "FROM SolarCapacity s " +
            "WHERE s.year.year = :year " +
            "AND s.location.region.id <= 6 ")
    List<PercentageDataDTO> findTop10SolarCapacityByYear(
            @Param("year") int year,
            Pageable pageable);
}
