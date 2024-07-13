package com.gokul.bikeserviceapi.Responses;

import com.gokul.bikeserviceapi.Models.BikeServices;
import lombok.Data;


public class AddServiceResponse {
    BikeServices yournewservice;

    public AddServiceResponse(BikeServices yournewservice) {
        this.yournewservice = yournewservice;
    }
}
