package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.dto.LocationDataDTO;
import com.talentotech2.ecoradar.dto.PercentageDataDTO;
import com.talentotech2.ecoradar.dto.YearDataDTO;
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

    @Query("SELECT new com.talentotech2.ecoradar.dto.YearDataDTO(" +
            "s.location.name, s.year.year) " +
            "FROM SolarCapacity s " +
            "WHERE s.location.id = :locationId ")
    List<YearDataDTO> findYearsAvailableByLocation(@Param("locationId") Integer locationId);

    @Query("SELECT s.year.year " +
            "FROM SolarCapacity s " +
            "GROUP BY s.year.year " +
            "HAVING COUNT(s) >= 10 " +
            "ORDER BY s.year.year ")
    List<Integer> findYearsAvailableToRank();

    @Query ("SELECT DISTINCT new com.talentotech2.ecoradar.dto.LocationDataDTO(" +
            "s.location.id, s.location.name) " +
            "FROM SolarCapacity s ")
    List<LocationDataDTO> findLocationsAvailable();

    @Query ("SELECT DISTINCT new com.talentotech2.ecoradar.dto.LocationDataDTO(" +
            "s.location.id, s.location.name) " +
            "FROM SolarCapacity s " +
            "WHERE s.location.region.id = :regionId")
    List<LocationDataDTO> findLocationsAvailableByRegion(@Param("regionId") Integer regionId);

}
