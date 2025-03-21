package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.models.Production;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductionRepository extends JpaRepository<Production, Integer> {

    @Query("SELECT p " +
            "FROM Production p " +
            "LEFT JOIN p.location l " +
            "LEFT JOIN p.year y " +
            "WHERE y.year BETWEEN :startYear AND :endYear " +
            "AND l.id = :locationId")
    List<Production> findProductionByLocationAndYearsRange(
            @Param("locationId") Integer locationId,
            @Param("startYear") int startYear,
            @Param("endYear") int endYear);

    @Query("SELECT p " +
            "FROM Production p " +
            "WHERE p.year.year = :year")
    List<Production> findTop10ConsumptionByYear(
            @Param("year") int year,
            Pageable pageable);

}
