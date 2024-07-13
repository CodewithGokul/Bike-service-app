package com.gokul.bikeserviceapi.Services;


import com.gokul.bikeserviceapi.DTO.Servicesdto;
import com.gokul.bikeserviceapi.Enum.Status;
import com.gokul.bikeserviceapi.Models.BikeServices;
import com.gokul.bikeserviceapi.Models.Bookings;
import com.gokul.bikeserviceapi.Models.Owners;
import com.gokul.bikeserviceapi.Models.Store;
import com.gokul.bikeserviceapi.Repository.BookingRepository;
import com.gokul.bikeserviceapi.Repository.OwnerRepository;
import com.gokul.bikeserviceapi.Repository.ServicesRepository;
import com.gokul.bikeserviceapi.Repository.StoreRepository;
import com.gokul.bikeserviceapi.Responses.BookingResponse;
import com.gokul.bikeserviceapi.Responses.SetStatus;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OwnerServices {
    private final ServicesRepository servicesRepository;
    private final OwnerRepository ownerRepository;
    private final BookingRepository bookingRepository;
    private final StoreRepository storeRepository;
    static Long ownerId = null;
    private final MailServices mailServices;

    @Transactional
    public List<BikeServices> yourServices(Integer storeId) {
        Optional<Store> store = storeRepository.findById(storeId);
        if (store.isPresent()) {
            List<BikeServices> service = store.get().getServices();
            return service;
        }
        return null;
    }

    public String saveServices(Integer id, Servicesdto servicesdto) {
        BikeServices bikeServices = new BikeServices();
        bikeServices.setServiceName(servicesdto.getServicename());
        bikeServices.setDescription(servicesdto.getDescription());
        bikeServices.setCharges(servicesdto.getCharges());
        Optional<Store> stores = storeRepository.findById(id);
        if (stores.isPresent()) {
            Store store = stores.get();
            bikeServices.setStore(store);
            servicesRepository.save(bikeServices);
            return store.getStoreName();
        }
        return null;
    }

    public boolean deleteService(Integer id) {
        Optional<BikeServices> user = servicesRepository.findById(id);
        if (user.isPresent()) {
            servicesRepository.delete(user.get());
            return true;
        } else {
            return false;
        }
    }

    public boolean editService(Integer id, BikeServices updateService) {
        Optional<BikeServices> existingService = servicesRepository.findById(id);

        if (existingService.isPresent()) {
            BikeServices existing = existingService.get();
            if (updateService.getServiceName() != null) {
                existing.setServiceName(updateService.getServiceName());
            }
            if (updateService.getDescription() != null) {
                existing.setDescription(updateService.getDescription());
            }
            if (updateService.getCharges() != null) {
                existing.setCharges(updateService.getCharges());
            }
            // Save the updated entity
            servicesRepository.save(existing);
            return true;
        }

        return false; // Bike service not found
    }

    public List<BookingResponse> getBookings() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<UserDetails> details = ownerRepository.findByEmail(username);
        if (details.isPresent()) {
            Owners owner = (Owners) details.get();
            ownerId = owner.getId();
        }
        List<BookingResponse> myBookings = new ArrayList<>();
        BookingResponse bookingResponse = null;
        List<BikeServices> bikeServices = servicesRepository.findAll();
        List<Bookings> bookings = bookingRepository.findAll();

        for (Bookings booking : bookings) {
            for (BikeServices service : bikeServices) {
                if (service.getId().equals(booking.getServiceId())) {
                    if (service.getStore().getOwner().getId().equals(ownerId)) {
                        bookingResponse = new BookingResponse();
                        bookingResponse.setBookId(booking.getId());
                        bookingResponse.setBookedDate(booking.getBookedDate());
                        bookingResponse.setServiceName(service.getServiceName());
                        bookingResponse.setBrand(booking.getBrand());
                        bookingResponse.setModel(booking.getModel());
                        bookingResponse.setVehicleNumber(booking.getVehicleNumber());
                        bookingResponse.setStoreName(service.getStore().getStoreName());
                        bookingResponse.setStoreAddress(service.getStore().getStoreAddress());
                        bookingResponse.setStatus(booking.getStatus());
                        myBookings.add(bookingResponse);
                    }
                }
            }
        }
        return myBookings;
    }

    public boolean updateStatus(Long id, SetStatus status) throws MessagingException {
        Optional<Bookings> bookings = bookingRepository.findById(id);
        if (bookings.isPresent()) {
            Bookings booking = bookings.get();
            booking.setStatus(status.getStatus());

            if (booking.getStatus() == Status.NONDELIVERY) {
                String to = booking.getCustomers().getEmail();
                String subject = "Ready For Delivery!!";

                String text = "<html>"
                        + "<body>"
                        + "Your Delivery of Vehicle Number: " + booking.getVehicleNumber() + "<br>"
                        + "Model of vehicle: " + booking.getModel() + "<br>"
                        + "is ready to deliver. Take Your Vehicle As Soon As Possible."
                        + "</body>"
                        + "</html>";

                mailServices.sendMimeMessage(to, subject, text);

                bookingRepository.save(booking);
                return true;
            }
//This Is Inform To Customer That Their Order Accepted By The Shop Owner And  Want To Bring The Vehicle To The Shop

            if(booking.getStatus() == Status.ACCEPTED){
                Optional<BikeServices> bikeServices = servicesRepository.findById(booking.getServiceId());
                if (bikeServices.isPresent()) {
                    BikeServices service = bikeServices.get();
                    String to = booking.getCustomers().getEmail();
                    String subject = "Your Order Accepted!!";
                    String text = "<html>"
                            + "<body>"
                            + "Your order has been accepted!<br>"
                            + "By " + service.getStore().getStoreName() + ". Please bring your vehicle as soon as possible.<br>"
                            + "Store Address: " + service.getStore().getStoreAddress() + "<br>"
                            + "Store Phone Number: " + service.getStore().getStorePhone() + "</body></html>";
                    mailServices.sendMimeMessage((to), subject, text);
                    return true;
                }
            }

        }
        return false;
    }

    public List<Store> displayStores() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<UserDetails> details = ownerRepository.findByEmail(username);
        if (details.isPresent()) {
            Owners owner = (Owners) details.get();
            List<Store> stores = new ArrayList<>();
            stores = storeRepository.findByOwner(owner);
            return stores;
        }
        return null;
    }

    public List<Store> addStore(Store store) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<UserDetails> details = ownerRepository.findByEmail(username);
        if (details.isPresent()) {
            Owners owner = (Owners) details.get();
            store.setOwner(owner);
            storeRepository.save(store);
            return storeRepository.findByOwner(owner);
        }
        return null;
    }
}
