package com.talentotech2.ecoradar.repositories;

import com.talentotech2.ecoradar.models.RenewablePercent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RenewablePercentRepository extends JpaRepository<RenewablePercent, Integer> {
}
