package com.d2ovj9.supercarcardgame.service;

import com.d2ovj9.supercarcardgame.request.RegisterUserRequest;
import com.d2ovj9.supercarcardgame.entity.Role;
import com.d2ovj9.supercarcardgame.entity.User;
import com.d2ovj9.supercarcardgame.repository.UserRepository;
import com.d2ovj9.supercarcardgame.seed.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;


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
        user.setPassword(encoder.encode(request.getPassword()));
        Role userRole = roleRepository.findByName("ROLE_USER").orElse(null);
        user.getRoles().add(userRole);
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
        if (!encoder.matches(oldPassword, storedPassword)) {
            return ResponseEntity.badRequest().body("Bad credentials");
        }

        user.get().setPassword(encoder.encode(newPassword));
        userRepository.save(user.get());
        return ResponseEntity.ok("Password changed");
    }

    public ResponseEntity<?> promoteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }

        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElse(null);
        user.get().getRoles().add(adminRole);
        userRepository.save(user.get());
        return ResponseEntity.ok("User Promoted");
    }

    public ResponseEntity<?> demoteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElse(null);
        user.get().getRoles().remove(adminRole);
        userRepository.save(user.get());

        return ResponseEntity.ok("User demoted");
    }

    public int countUsers() {
        return (int) userRepository.count();
    }

    // TODO: userrepository -> countByRoles...this could be bad
    public int countMods() {
        return userRepository.countByRolesName("ROLE_ADMIN");
    }

    public void winner(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return;
        }
        user.get().setGamesPlayed(user.get().getGamesPlayed() + 1);
        user.get().setGamesWon(user.get().getGamesWon() + 1);
        userRepository.save(user.get());
    }

    public void loser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return;
        }
        user.get().setGamesPlayed(user.get().getGamesPlayed() + 1);
        userRepository.save(user.get());
    }
}
