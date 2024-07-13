package com.gokul.bikeserviceapi.Repository;


import com.gokul.bikeserviceapi.Models.Owners;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface OwnerRepository extends JpaRepository<Owners, Long> {

    Optional<UserDetails> findByEmail(String email);

}
