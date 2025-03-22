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
@Table(name = "solar_capacity")
public class SolarCapacity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solar_capacity_id")
    private Integer id;

    @Column(name = "percent")
    private double percent;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "year_id")
    private Year year;

}
