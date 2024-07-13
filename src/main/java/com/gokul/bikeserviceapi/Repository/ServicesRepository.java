package com.gokul.bikeserviceapi.Repository;

import com.gokul.bikeserviceapi.Models.BikeServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface ServicesRepository extends JpaRepository<BikeServices, Integer> {

}
