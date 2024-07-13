package com.gokul.bikeserviceapi.DTO;


import lombok.Data;

@Data
public class Servicesdto {
    private String servicename;
    private String description;
    private Integer charges;
    private String address;
}
