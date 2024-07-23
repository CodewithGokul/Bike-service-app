package com.gokul.bikeserviceapi.Services;
import com.gokul.bikeserviceapi.DTO.Servicesdto;
import com.gokul.bikeserviceapi.Enum.Status;
import com.gokul.bikeserviceapi.Models.BikeServices;
import com.gokul.bikeserviceapi.Models.Bookings;
import com.gokul.bikeserviceapi.Models.Owners;
import com.gokul.bikeserviceapi.Repository.BookingRepository;
import com.gokul.bikeserviceapi.Repository.OwnerRepository;
import com.gokul.bikeserviceapi.Repository.ServicesRepository;
import com.gokul.bikeserviceapi.Responses.BookingResponse;
import com.gokul.bikeserviceapi.Responses.SetStatus;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OwnerServices {
    private final ServicesRepository servicesRepository;
    private final OwnerRepository ownerRepository;
    private final BookingRepository bookingRepository;
    static Long ownerId = null;
    private final MailServices mailServices;


    public List<BikeServices> yourServices() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<UserDetails> owner = ownerRepository.findByEmail(email);
        if (owner.isPresent()) {
            Owners owners = (Owners) owner.get();
            List<BikeServices> services = owners.getServices();
            return services;
        }
        return null;
    }

    public String saveServices(Servicesdto servicesdto) {
        System.out.println(servicesdto.getLocation());
        BikeServices bikeServices = new BikeServices();
        bikeServices.setServiceName(servicesdto.getServicename());
        bikeServices.setDescription(servicesdto.getDescription());
        bikeServices.setCharges(servicesdto.getCharges());
        bikeServices.setLocation(servicesdto.getLocation());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<UserDetails> user = ownerRepository.findByEmail(username);
        if (user.isPresent()) {
            Owners owners = (Owners) user.get();
            bikeServices.setOwners(owners);
            servicesRepository.save(bikeServices);
            return "Saved Successfully";
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
                    if (service.getOwners().getId().equals(ownerId)) {
                        bookingResponse = new BookingResponse();
                        bookingResponse.setBookId(booking.getId());
                        bookingResponse.setBookedDate(booking.getBookedDate());
                        bookingResponse.setServiceName(service.getServiceName());
                        bookingResponse.setBrand(booking.getBrand());
                        bookingResponse.setModel(booking.getModel());
                        bookingResponse.setVehicleNumber(booking.getVehicleNumber());
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
            bookingRepository.save(booking);
            if (booking.getStatus() == Status.NONDELIVERY) {
                String to = booking.getCustomers().getEmail();
                System.out.println(to);
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
                            + "By " + service.getOwners().getName()+ ". Please bring your vehicle as soon as possible.<br>"
                            + "Service Address: " + service.getLocation() + "<br>"
                            + "Store Phone Number: " + service.getOwners().getPhoneNumber() + "</body></html>";
                    mailServices.sendMimeMessage((to), subject, text);
                    return true;
                }
            }

        }
        return false;
    }


}
