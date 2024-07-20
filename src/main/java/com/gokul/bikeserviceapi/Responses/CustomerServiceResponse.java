package com.gokul.bikeserviceapi.Responses;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class CustomerServiceResponse {

    @Column(nullable = false)
    private Integer serviceId;
    private String serviceName;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private Integer charges;
    @Column(nullable = false)
    private String Location;
}
