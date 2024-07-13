package com.gokul.bikeserviceapi.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Store {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(nullable = false)
    private String storeName;
    @Column(nullable = false, unique = true)
    private String storeAddress;
    @Column(nullable = false, unique = true)
    private String storeRegisterNumber;
    @Column(nullable = false)
    private String storePhone;
    @JsonIgnore
    @ManyToOne
    private Owners owner;
    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BikeServices> services;
}
