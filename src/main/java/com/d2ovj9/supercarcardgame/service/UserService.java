package com.d2ovj9.supercarcardgame.service;

import com.d2ovj9.supercarcardgame.dto.RegisterUserRequest;
import com.d2ovj9.supercarcardgame.entity.Authority;
import com.d2ovj9.supercarcardgame.entity.User;
import com.d2ovj9.supercarcardgame.repository.AuthorityRepository;
import com.d2ovj9.supercarcardgame.repository.UserRepository;
import com.d2ovj9.supercarcardgame.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final CustomPasswordEncoder encoder;

    @Autowired
    public UserService(UserRepository userRepository, AuthorityRepository authorityRepository, CustomPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.encoder = encoder;
    }

    public void createAuthorities() {
        Authority adminAuthority = new Authority();
        adminAuthority.setAuthority("ADMIN");
        authorityRepository.save(adminAuthority);
        Authority userAuthority = new Authority();
        userAuthority.setAuthority("USER");
        authorityRepository.save(userAuthority);
    }



    public void createAdmin() {
        // Create and save authorities
//        Authority adminAuthority = new Authority();
//        adminAuthority.setAuthority("ADMIN");
//        authorityRepository.save(adminAuthority);
//
//        Authority userAuthority = new Authority();
//        userAuthority.setAuthority("USER");
//        authorityRepository.save(userAuthority);

        // Create the admin user and associate authorities
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(encoder.getPasswordEncoder().encode("admin"));
        Optional<Authority> adminAuthority = authorityRepository.findByAuthority("ADMIN");
        Optional<Authority> userAuthority = authorityRepository.findByAuthority("USER");
        admin.setAuthorities(Arrays.asList(adminAuthority.get(), userAuthority.get()));
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
        Authority userAuthority = authorityRepository.findByAuthority("USER").orElse(null);
        user.getAuthorities().add(userAuthority);
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

    public ResponseEntity<?> promoteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }

        Authority adminAuthority = authorityRepository.findByAuthority("ADMIN").orElse(null);
        user.get().getAuthorities().add(adminAuthority);
        userRepository.save(user.get());
        return ResponseEntity.ok("User Promoted");
    }

    public ResponseEntity<?> demoteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }
        Authority adminAuthority = authorityRepository.findByAuthority("ADMIN").orElse(null);
        user.get().getAuthorities().remove(adminAuthority);
        userRepository.save(user.get());

        return ResponseEntity.ok("User demoted");
    }

    public int countUsers() {
        return (int) userRepository.count();
    }

    public int countMods() {
        return userRepository.countByAuthoritiesAuthority("ADMIN");
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
