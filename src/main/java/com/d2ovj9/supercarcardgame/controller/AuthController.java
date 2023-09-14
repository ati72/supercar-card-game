package com.d2ovj9.supercarcardgame.controller;

import com.d2ovj9.supercarcardgame.dto.AuthCredentialsRequest;
import com.d2ovj9.supercarcardgame.entity.User;
import com.d2ovj9.supercarcardgame.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {
    private final AuthenticationProvider authenticationProvider;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(AuthenticationProvider authenticationProvider, JwtUtil jwtUtil) {
        this.authenticationProvider = authenticationProvider;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request) {
        try {
            Authentication authenticate = authenticationProvider
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(),
                                    request.getPassword()
                            )
                    );
            User user = (User) authenticate.getPrincipal();
            // so it doesn't send out the actual password
            user.setPassword(null);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(user));
            httpHeaders.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "authorization");

            return ResponseEntity.ok()
                    .headers(httpHeaders)
                    .body(user);
            // TODO: DTO so this doesn't send out password and stuff

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // api/auth/validate?token=blabla
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user) {
        try {
            Boolean isTokenValid = jwtUtil.validateToken(token, user);
            return ResponseEntity.ok(isTokenValid);
        } catch (ExpiredJwtException ex) {
            return ResponseEntity.ok(false);
        }
    }
}
