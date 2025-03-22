package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.dto.YearDataDTO;
import com.talentotech2.ecoradar.model.Consumption;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsumptionRepository extends JpaRepository<Consumption, Integer> {

    @Query("SELECT new com.talentotech2.ecoradar.dto.DefaultDataDTO(" +
            "l.name, y.year, c.hydroData, c.windData, c.bioAndOtherData, c.solarData) " +
            "FROM Consumption c " +
            "LEFT JOIN c.location l " +
            "LEFT JOIN c.year y " +
            "WHERE y.year BETWEEN :startYear AND :endYear " +
            "AND l.id = :locationId")
    List<DefaultDataDTO> findConsumptionByLocationAndYearsRange(
            @Param("locationId") Integer locationId,
            @Param("startYear") int startYear,
            @Param("endYear") int endYear);

    @Query("SELECT new com.talentotech2.ecoradar.dto.DefaultDataDTO(" +
            "c.location.name, c.year.year,  c.hydroData, c.windData, c.bioAndOtherData, c.solarData) " +
            "FROM Consumption c " +
            "WHERE c.year.year = :year " +
            "AND c.location.region.id <= 6")
    List<DefaultDataDTO> findTop10ConsumptionsByYear(
            @Param("year") int year,
            Pageable pageable);

    @Query("SELECT new com.talentotech2.ecoradar.dto.YearDataDTO(" +
            "c.location.name, c.year.year) " +
            "FROM Consumption c " +
            "WHERE c.location.id = :locationId ")
    List<YearDataDTO> findYearsAvailableByLocation(@Param("locationId") Integer locationId);
}
