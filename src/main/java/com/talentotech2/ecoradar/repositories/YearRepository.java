package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.models.Year;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YearRepository extends JpaRepository<Year, Integer> {

}
