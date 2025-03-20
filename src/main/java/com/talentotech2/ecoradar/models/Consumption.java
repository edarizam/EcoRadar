package com.talentotech2.ecoradar.models;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "renewable_energy_consumption")
public class Consumption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consumption_id")
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
    private Location locationId;

    @ManyToOne
    @JoinColumn(name = "year_id")
    private Year yearId;
}
