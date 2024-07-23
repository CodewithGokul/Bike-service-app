package com.gokul.bikeserviceapi.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;

@Component
public class Jwtutils {
    public static String SECRET_KEY = "015e33484acd7f806e3fbd5cb9e137c084f92fb8870db28efec0b3a5d7ed08d5";

    public String JwtGenerate(UserDetails userDetails) {

        // Generate JWT Token
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // 1 day expiration
                .signWith(getKey())  // Signature part
                .compact();
    }


    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    public Claims getClaims(String token) {
        // Parse and verify the JWT token
        Jws<Claims> parsedToken = Jwts.parserBuilder()
                .setSigningKey(getKey()) // Set the signing key used during token generation
                .build()
                .parseClaimsJws(token); // Parse the token and verify the signature
        // Extract and return the claims/payload from the parsed token
        return parsedToken.getBody();
    }

    public boolean isExpired(String token){
        Claims claims = getClaims(token);
        return claims.getExpiration().before(Date.from(Instant.now()));
    }

    public boolean validToken(String Token,UserDetails userDetails){
        String tokenName = extractUsername(Token);

        return (tokenName.equals(userDetails.getUsername()) && !isExpired(Token));
    }
}
