package com.gokul.bikeserviceapi.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gokul.bikeserviceapi.Enum.Status;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
public class Bookings{
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private String model;
    @Column(nullable = false)
    private Integer year;
    @Column(nullable = false)
    private String vehicleNumber;
    @Column(nullable = false)
    private Date date;
    private Date bookedDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="cus_id")
    @JsonIgnore
    private Customers customers;     //To Get Information About Customers
    private Integer serviceId;         //To Get Information About Services
    private Status status;
}