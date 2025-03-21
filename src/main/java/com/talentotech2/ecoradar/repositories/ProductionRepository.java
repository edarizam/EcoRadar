package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.dto.DefaultDataDTO;
import com.talentotech2.ecoradar.models.Production;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductionRepository extends JpaRepository<Production, Integer> {

    @Query("SELECT new com.talentotech2.ecoradar.dto.DefaultDataDTO(" +
            "l.name, y.year, p.hydroData, p.windData, p.bioAndOtherData, p.solarData) " +
            "FROM Production p " +
            "LEFT JOIN p.location l " +
            "LEFT JOIN p.year y " +
            "WHERE y.year BETWEEN :startYear AND :endYear " +
            "AND l.id = :locationId")
    List<DefaultDataDTO> findProductionByLocationAndYearsRange(
            @Param("locationId") Integer locationId,
            @Param("startYear") int startYear,
            @Param("endYear") int endYear);

    @Query("SELECT new com.talentotech2.ecoradar.dto.DefaultDataDTO(" +
            "p.location.name, p.year.year, p.hydroData, p.windData, p.bioAndOtherData, p.solarData) " +
            "FROM Production p " +
            "WHERE p.year.year = :year " +
            "AND p.location.region.id <= 6")
    List<DefaultDataDTO> findTop10ProductionByYear(
            @Param("year") int year,
            Pageable pageable);

}
