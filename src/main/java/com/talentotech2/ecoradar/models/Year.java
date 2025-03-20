package com.talentotech2.ecoradar.models;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "year")
public class Year {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "year_id")
    private Integer id;

    @Column(name = "year")
    private int year;

    @OneToMany(mappedBy = "id")
    private List<Consumption> consumptions;

    @OneToMany(mappedBy = "id")
    private List<Production> productions;

    @OneToMany(mappedBy = "id")
    private List<SolarCapacity> solarCapacities;

    @OneToMany(mappedBy = "id")
    private List<RenewablePercent> renewablePercents;

}
