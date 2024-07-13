package com.gokul.bikeserviceapi.Controllers;


import com.gokul.bikeserviceapi.DTO.Bookingdto;
import com.gokul.bikeserviceapi.Models.Bookings;
import com.gokul.bikeserviceapi.Responses.BookingResponse;
import com.gokul.bikeserviceapi.Responses.CustomerServiceResponse;
import com.gokul.bikeserviceapi.Services.CustomerServices;
import com.gokul.bikeserviceapi.Services.MailServices;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@AllArgsConstructor
public class CustomerController {
    private final MailServices mailServices;
    private final CustomerServices customerServices;

    @GetMapping("/services")    //Showing All Services
    public ResponseEntity<List<CustomerServiceResponse>> getAllServices() {
        return ResponseEntity.ok(customerServices.allServices());
    }

    @PostMapping("/services/{serviceId}") //Booking The Service Using ServiceId
    public ResponseEntity<Bookings> addBooking(@PathVariable Integer serviceId, @RequestBody Bookingdto bookingdto) throws MessagingException {
        return ResponseEntity.ok(customerServices.addBooking(serviceId, bookingdto));
    }

    @GetMapping("/booking-status")  //Booking Status
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        return ResponseEntity.ok(customerServices.getBookings());
    }
}