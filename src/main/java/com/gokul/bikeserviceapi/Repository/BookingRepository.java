package com.gokul.bikeserviceapi.Repository;


import com.gokul.bikeserviceapi.Models.Bookings;
import com.gokul.bikeserviceapi.Models.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface BookingRepository extends JpaRepository<Bookings,Long> {




    List<Bookings> findAllByCustomers(Customers id);
}
