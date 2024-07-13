package com.gokul.bikeserviceapi.Services;


import com.gokul.bikeserviceapi.DTO.Bookingdto;
import com.gokul.bikeserviceapi.Enum.Status;
import com.gokul.bikeserviceapi.Models.BikeServices;
import com.gokul.bikeserviceapi.Models.Bookings;
import com.gokul.bikeserviceapi.Models.Customers;
import com.gokul.bikeserviceapi.Models.Store;
import com.gokul.bikeserviceapi.Repository.BookingRepository;
import com.gokul.bikeserviceapi.Repository.CustomerRepository;
import com.gokul.bikeserviceapi.Repository.ServicesRepository;
import com.gokul.bikeserviceapi.Responses.BookingResponse;
import com.gokul.bikeserviceapi.Responses.CustomerServiceResponse;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerServices {

    private final ServicesRepository servicesRepository;
    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final MailServices mailServices;

    //To List All Bike Services
    public List<CustomerServiceResponse> allServices() {
        List<CustomerServiceResponse> services = new ArrayList<>();
        servicesRepository.findAll().forEach(service->{
            CustomerServiceResponse customerServiceResponse = new CustomerServiceResponse();
            customerServiceResponse.setServiceId(service.getId());
            customerServiceResponse.setServiceName(service.getServiceName());
            customerServiceResponse.setDescription(service.getDescription());
            customerServiceResponse.setCharges(service.getCharges());
            customerServiceResponse.setStoreName(service.getStore().getStoreName());
            customerServiceResponse.setStoreAddress(service.getStore().getStoreAddress());
            services.add(customerServiceResponse);
        });
                return services;
    }

    public Bookings addBooking(Integer id, Bookingdto bookingdto) throws MessagingException {

        //The Below Logic Is for Booking By User

        Bookings bookings = new Bookings();

        bookings.setServiceId(id);
        bookings.setStatus(Status.PENDING);
        bookings.setDate(bookingdto.getDate());
        bookings.setBrand(bookingdto.getBrand());
        bookings.setModel(bookingdto.getModel());
        bookings.setYear(bookingdto.getYear());
        bookings.setVehicleNumber(bookingdto.getVehicleNumber());
        bookings.setBookedDate(new Date());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<Customers> customers = customerRepository.findByEmail(username);

        Customers customer = customers.get();
        bookings.setCustomers(customer);


        //The below Logic For Mail Sending To The Owner After Booked By Customer

        Optional<BikeServices> bikeServices = servicesRepository.findById(id);
        if (bikeServices.isPresent()) {
            BikeServices bikes = bikeServices.get();
            Store store = bikes.getStore();

            //After Booking Email logic Written Here It Going To use Mail-service class's sendmimemessage method

            String subject = "New Booking!!!";
            String to = store.getOwner().getEmail();
            String text = "The User " + customer.getUsername() + "<br>" +
                    "Booked vehicle Service For the " + bikes.getServiceName() + "<br>" +
                    "Customer PhoneNumber: " + customer.getPhoneNumber() + "<br>" +
                    "Customer Vehicle Details:<br>" +
                    "Vehicle Brand: " + bookings.getBrand() + "<br>" +
                    "Vehicle Model: " + bookings.getModel() + "<br>" +
                    "Model Year: " + bookings.getYear() + "<br>" +
                    "Shop Address: "+ store.getStoreAddress()+ "<br>" +
                    "Vehicle Number: " + bookings.getVehicleNumber() + "<br>" +
                    "For More Information Check-Out The app";


            mailServices.sendMimeMessage(to, subject, text);
            bookingRepository.save(bookings);  //Saved In the DB
        }
        return bookings;
    }

    public List<BookingResponse> getBookings() {

        //It Is Logic  About User's Booking Details And Its Booking Status
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        List<BookingResponse> customerBookings = new ArrayList<>();
        List<Bookings> bookings;
        Optional<Customers> customer = customerRepository.findByEmail(username);
        if (customer.isPresent()) {
            Customers customers = customer.get();
            bookings = bookingRepository.findAllByCustomers(customers);
            for (Bookings booking : bookings) {
                Optional<BikeServices> bikeServices = servicesRepository.findById(booking.getServiceId());
                BookingResponse bookingResponse = getBookingResponse(booking, bikeServices);
                customerBookings.add(bookingResponse);
            }
            return customerBookings;
        }
        return null;
    }

    private static BookingResponse getBookingResponse(Bookings booking, Optional<BikeServices> bikeServices) {
        BikeServices bikes = bikeServices.get();
        BookingResponse bookingResponse = new BookingResponse();
        bookingResponse.setBookId(booking.getId());
        bookingResponse.setServiceName(bikes.getServiceName());
        bookingResponse.setBookedDate(booking.getBookedDate());
        bookingResponse.setBrand(booking.getBrand());
        bookingResponse.setModel(booking.getModel());
        bookingResponse.setVehicleNumber(booking.getVehicleNumber());
        bookingResponse.setStatus(booking.getStatus());
        bookingResponse.setStoreAddress(bikes.getStore().getStoreAddress());
        bookingResponse.setStoreName(bikes.getStore().getStoreName());
        return bookingResponse;
    }

}
