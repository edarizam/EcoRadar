package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.dto.PercentageDataDTO;
import com.talentotech2.ecoradar.models.RenewablePercent;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RenewablePercentRepository extends JpaRepository<RenewablePercent, Integer> {

    @Query("SELECT new com.talentotech2.ecoradar.dto.PercentageDataDTO(" +
            "l.name, y.year, r.renewablePercent) " +
            "FROM RenewablePercent r " +
            "LEFT JOIN r.location l " +
            "LEFT JOIN r.year y " +
            "WHERE y.year BETWEEN :startYear AND :endYear " +
            "AND l.id = :locationId ")
    List<PercentageDataDTO> findRenewablePercentByLocationAndRangeYear(
            @Param("locationId") Integer locationId,
            @Param("startYear") int startYear,
            @Param("endYear") int endYear);

    @Query("SELECT new com.talentotech2.ecoradar.dto.PercentageDataDTO(" +
            "r.location.name, r.year.year, r.renewablePercent)  " +
            "FROM RenewablePercent r " +
            "WHERE r.year.year = :year " +
            "AND r.renewablePercent <> 0 " +
            "AND r.location.region.id <= 6")
    List<PercentageDataDTO> findTop10RenewablePercent(
            @Param("year") int year,
            Pageable pageable);
}
