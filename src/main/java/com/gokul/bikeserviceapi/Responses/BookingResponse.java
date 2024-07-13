package com.gokul.bikeserviceapi.Responses;


import com.gokul.bikeserviceapi.Enum.Status;
import jakarta.persistence.Column;
import lombok.Data;

import java.util.Date;
@Data
public class BookingResponse {
    @Column(nullable = false)
    private Long bookId;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private String model;
    @Column(nullable = false)
    private String vehicleNumber;
    @Column(nullable = false)
    private String serviceName;
    @Column(nullable = false)
    private String storeName;
    @Column(nullable = false)
    private String storeAddress;
    @Column(nullable = false)
    private Status status;
    @Column(nullable = false)
    private Date bookedDate;
}
