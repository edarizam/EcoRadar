package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.models.RenewablePercent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RenewablePercentRepository extends JpaRepository<RenewablePercent, Integer> {

    @Query("SELECT r " +
            "FROM RenewablePercent r " +
            "LEFT JOIN r.location l " +
            "LEFT JOIN r.year y " +
            "WHERE y.year BETWEEN :startYear AND :endYear " +
            "AND l.id = :locationId ")
    List<RenewablePercent> findRenewablePercentByLocationAndRangeYear(
            @Param("locationId") Integer locationId,
            @Param("startYear") int startYear,
            @Param("endYear") int endYear);


}
