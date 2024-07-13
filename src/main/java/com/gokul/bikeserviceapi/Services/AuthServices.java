package com.gokul.bikeserviceapi.Services;


import com.gokul.bikeserviceapi.DTO.Customerlogindto;
import com.gokul.bikeserviceapi.DTO.Customersignupdto;
import com.gokul.bikeserviceapi.DTO.Ownerlogindto;
import com.gokul.bikeserviceapi.DTO.Ownersignupdto;
import com.gokul.bikeserviceapi.Enum.Roles;
import com.gokul.bikeserviceapi.Models.Customers;
import com.gokul.bikeserviceapi.Models.Owners;
import com.gokul.bikeserviceapi.Repository.CustomerRepository;
import com.gokul.bikeserviceapi.Repository.OwnerRepository;
import com.gokul.bikeserviceapi.Responses.TokenResponse;
import com.gokul.bikeserviceapi.Utils.Jwtutils;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class AuthServices {

    private final CustomerRepository customerRepository;
    private final OwnerRepository ownerRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final AuthenticationManager authenticationManager;
    private final Jwtutils jwtutils;

    public Customers customersignup(Customersignupdto customersignupdto) {
        Customers customers = new Customers();
        customers.setRole(Roles.USERS);
        customers.setEmail(customersignupdto.getEmail());
        customers.setName(customersignupdto.getName());
        customers.setPassword(passwordEncoder.encode(customersignupdto.getPassword()));
        customers.setPhoneNumber(customersignupdto.getPhoneNumber());
        customers.setAccountCreated(new Date());
        customers.setLastlogin(new Date());

        customerRepository.save(customers);

        return customers;
    }


    public TokenResponse validateLoginCustomer(Customerlogindto customerlogindto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(customerlogindto.getEmail(), customerlogindto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails customer = customerRepository.findByEmail(customerlogindto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Usernamme not found"));
        String token = jwtutils.JwtGenerate(customer);
        return new TokenResponse(token);
    }

    public Owners ownerSignup(Ownersignupdto ownersignupdto) {
        Owners owners = new Owners();
        owners.setName(ownersignupdto.getName());
        owners.setPassword(passwordEncoder.encode(ownersignupdto.getPassword()));
        owners.setPhoneNumber(ownersignupdto.getPhoneNumber());
        owners.setEmail(ownersignupdto.getEmail());
        owners.setAccountCreated(new Date());
        owners.setRole(Roles.OWNERS);
        ownerRepository.save(owners);
        return owners;
    }

    public TokenResponse validateLoginOwner(Ownerlogindto ownerlogindto) {

        //Authentication Will be done Using Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(ownerlogindto.getEmail(), ownerlogindto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //After Validation Token Generation will be held
        var customer = ownerRepository.findByEmail(ownerlogindto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Username Not Found"));
        String token = jwtutils.JwtGenerate(customer);
        return new TokenResponse(token);
    }
}