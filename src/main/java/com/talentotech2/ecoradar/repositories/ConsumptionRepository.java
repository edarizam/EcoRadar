package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.models.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsumptionRepository extends JpaRepository<Consumption, Integer> {

    @Query("SELECT c " +
            "FROM Consumption c " +
            "LEFT JOIN c.location l " +
            "LEFT JOIN c.year y " +
            "WHERE y.year BETWEEN :startYear AND :endYear " +
            "AND l.id = :locationId")
    List<Consumption> findConsumptionByLocationAndYearsRange(
            @Param("locationId") Integer locationId,
            @Param("startYear") int startYear,
            @Param("endYear") int endYear); 
}
