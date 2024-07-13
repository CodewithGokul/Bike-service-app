package com.gokul.bikeserviceapi.Repository;


import com.gokul.bikeserviceapi.Models.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface CustomerRepository extends JpaRepository<Customers,Long> {

    Optional<Customers> findByEmail(String userEmail);

}
