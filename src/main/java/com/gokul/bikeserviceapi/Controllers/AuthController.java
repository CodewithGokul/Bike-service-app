package com.gokul.bikeserviceapi.Controllers;

import com.gokul.bikeserviceapi.DTO.Customerlogindto;
import com.gokul.bikeserviceapi.DTO.Customersignupdto;
import com.gokul.bikeserviceapi.DTO.Ownerlogindto;
import com.gokul.bikeserviceapi.DTO.Ownersignupdto;
import com.gokul.bikeserviceapi.Models.Customers;
import com.gokul.bikeserviceapi.Models.Owners;
import com.gokul.bikeserviceapi.Responses.TokenResponse;
import com.gokul.bikeserviceapi.Services.AuthServices;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthServices authServices;

    //Signup For Customers
    @PostMapping("/customer/signup")
    public Customers setCustomerSignup(@RequestBody Customersignupdto customerSignup) {
        System.out.println("Clicked");
        return authServices.customersignup(customerSignup);
    }

    //Login for Customers
    @PostMapping("/customer/login")
    public ResponseEntity<TokenResponse> setCustomerlogin(@RequestBody Customerlogindto customerlogindto) {

        return ResponseEntity.ok(authServices.validateLoginCustomer(customerlogindto));
    }

    //Signup for Owners
    @PostMapping("/owner/signup")
    public Owners setOwnerSignup(@RequestBody Ownersignupdto ownersignupdto) {
        return authServices.ownerSignup(ownersignupdto);
    }

    //Login for Owners
    @PostMapping("/owner/login")
    public ResponseEntity<TokenResponse> setOnwerlogin(@RequestBody Ownerlogindto ownerlogindto) {
        return ResponseEntity.ok(authServices.validateLoginOwner(ownerlogindto));
    }
}