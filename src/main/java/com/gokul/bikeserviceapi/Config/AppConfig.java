package com.gokul.bikeserviceapi.Config;


import com.gokul.bikeserviceapi.Repository.CustomerRepository;
import com.gokul.bikeserviceapi.Repository.OwnerRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

//The Below Class Fully Belongs To The Spring Security
@Component
@AllArgsConstructor
public class AppConfig {


    private final CustomerRepository customerRepository;

    private final OwnerRepository ownerRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                try {
                    return customerRepository.findByEmail(username)
                            .orElseThrow(() -> new UsernameNotFoundException(""));
                } catch (UsernameNotFoundException e) {
                    return ownerRepository.findByEmail(username)
                            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
                }
            }
        };
    }

    @Bean
    public AuthenticationProvider customerAuthenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
        return auth.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
