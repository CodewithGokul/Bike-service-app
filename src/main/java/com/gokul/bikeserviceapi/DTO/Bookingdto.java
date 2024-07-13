package com.gokul.bikeserviceapi.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class Bookingdto {
    private String brand;
    private String model;
    private Integer year;
    private String vehicleNumber;
    private Date date;
}
