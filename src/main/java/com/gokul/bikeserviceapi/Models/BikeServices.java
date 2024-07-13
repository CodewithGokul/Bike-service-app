package com.gokul.bikeserviceapi.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "bike_services")
public class BikeServices {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(nullable = false)
    private String serviceName;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private Integer charges;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "store_id")
    private Store store;
}
