package com.gokul.bikeserviceapi.Repository;


import com.gokul.bikeserviceapi.Models.Owners;
import com.gokul.bikeserviceapi.Models.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface StoreRepository extends JpaRepository<Store, Integer> {
    List<Store> findByOwner(Owners owner);
}
