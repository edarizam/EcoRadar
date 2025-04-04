package com.talentotech2.ecoradar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;

    @OneToMany(mappedBy = "id")
    private List<Consumption> consumptions;

    @OneToMany(mappedBy = "id")
    private List<Production> productions;

    @OneToMany(mappedBy = "id")
    private List<SolarCapacity> solarCapacities;

    @OneToMany(mappedBy = "id")
    private List<RenewablePercent> renewablePercents;
}
