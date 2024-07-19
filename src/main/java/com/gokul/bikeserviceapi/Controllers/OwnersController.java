package com.gokul.bikeserviceapi.Controllers;


import com.gokul.bikeserviceapi.DTO.Servicesdto;
import com.gokul.bikeserviceapi.Models.BikeServices;
import com.gokul.bikeserviceapi.Models.Store;
import com.gokul.bikeserviceapi.Responses.BookingResponse;
import com.gokul.bikeserviceapi.Responses.SetStatus;
import com.gokul.bikeserviceapi.Services.OwnerServices;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/owners")
@AllArgsConstructor
public class OwnersController {
    private final OwnerServices ownerServices;

    @PostMapping("add-stores")  //Adding Stores of Owner This Is Because Owner Can Have Many Stores
    public ResponseEntity<List<Store>> addStores(@RequestBody Store store) throws MessagingException {
        return ResponseEntity.ok(ownerServices.addStore(store));
    }

    @GetMapping("your-stores") //Displaying Owner's Stores Because To retrieve Store Id For Front-End Purpose
    public ResponseEntity<List<Store>> getStores() throws MessagingException {
        return ResponseEntity.ok(ownerServices.displayStores());
    }


    @PostMapping("add-services/{storeId}")  //Adding Services In  The Store Using Store Id
    public ResponseEntity<String> addServices(@PathVariable Integer storeId, @RequestBody Servicesdto servicesdto) {

        return ResponseEntity.ok("Service Added in " +  ownerServices.saveServices(storeId, servicesdto));
    }

//    @GetMapping("/your-services/{storeId}")  //Displaying Services Of Owner Selected Store Id
//    public ResponseEntity<List<BikeServices>> getServices(@PathVariable Integer storeId) {
//        return ResponseEntity.ok(ownerServices.yourServices(storeId));
//    }


    //Below Are Crud Operation Takes Place on Services

    @DeleteMapping("/delete-service/{serviceId}")
    public ResponseEntity<String> deleteService(@PathVariable Integer serviceId) {
        if (ownerServices.deleteService(serviceId)) {
            return ResponseEntity.ok("Deleted Successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Such Service Exist");
        }
    }

    @PatchMapping("/edit-service/{serviceId}")
    public ResponseEntity<String> editServices(@PathVariable Integer serviceId, @RequestBody BikeServices bikeServices) {
        if (ownerServices.editService(serviceId, bikeServices)) {
            return ResponseEntity.ok("Edited Successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Such Service Exist");
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingResponse>> getBookings() {
        List<BookingResponse> bookings = ownerServices.getBookings();
        return ResponseEntity.ok(bookings);
    }

    @PatchMapping("/edit-status/{bookId}")
    public ResponseEntity<String> updateBookingStatus(@PathVariable Long bookId, @RequestBody SetStatus status) throws MessagingException {
        if (ownerServices.updateStatus(bookId, status)) {
            return ResponseEntity.ok("Updated Successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Such Booking Exist");
        }
    }
}
