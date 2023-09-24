package com.d2ovj9.supercarcardgame.service;

import com.d2ovj9.supercarcardgame.dto.RegisterUserRequest;
import com.d2ovj9.supercarcardgame.entity.User;
import com.d2ovj9.supercarcardgame.repository.UserRepository;
import com.d2ovj9.supercarcardgame.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final CustomPasswordEncoder encoder;

    @Autowired
    public UserService(UserRepository userRepository, CustomPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public void createAdmin() {
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(encoder.getPasswordEncoder().encode("admin"));
        userRepository.save(admin);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    public ResponseEntity<?> registerUser(RegisterUserRequest request) {
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());

        if (existingUser.isPresent()) {
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("code", "123");
            responseBody.put("message", "Username already exists.");
            return ResponseEntity.badRequest().body(responseBody);
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encoder.getPasswordEncoder().encode(request.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User saved");
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> findTop10User() {
        return userRepository.findTop10ByOrderByGamesWonDesc();
    }

    public ResponseEntity<?> changePassword(String username, String oldPassword, String newPassword) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }

        String storedPassword = user.get().getPassword();
        if (!encoder.getPasswordEncoder().matches(oldPassword, storedPassword)) {
            return ResponseEntity.badRequest().body("Bad credentials");
        }
        user.get().setPassword(encoder.getPasswordEncoder().encode(newPassword));
        userRepository.save(user.get());
        return ResponseEntity.ok("Password changed");
    }
}
