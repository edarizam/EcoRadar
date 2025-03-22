package com.talentotech2.ecoradar.model;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "renewable_energy_production")
public class Production {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "production_id")
    private Integer id;

    @Column(name = "bioenergy_TWh")
    private double bioAndOtherData;

    @Column(name = "solar_TWh")
    private double solarData;

    @Column(name = "wind_TWh")
    private double windData;

    @Column(name = "hydro_TWh")
    private double hydroData;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "year_id")
    private Year year;
}
