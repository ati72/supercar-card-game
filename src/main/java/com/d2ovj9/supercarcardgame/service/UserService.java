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

    // Authority-k létrehozása
    public void createAuthorities() {
        Authority adminAuthority = new Authority();
        adminAuthority.setAuthority("ADMIN");
        authorityRepository.save(adminAuthority);
        Authority userAuthority = new Authority();
        userAuthority.setAuthority("USER");
        authorityRepository.save(userAuthority);
    }


    // Admin felhasználó létrehozása, már nincs használatban, a setup sql kód állítja elő az admint
    public void createAdmin() {
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(encoder.getPasswordEncoder().encode("admin"));
        Optional<Authority> adminAuthority = authorityRepository.findByAuthority("ADMIN");
        Optional<Authority> userAuthority = authorityRepository.findByAuthority("USER");
        admin.setAuthorities(Arrays.asList(adminAuthority.get(), userAuthority.get()));
        userRepository.save(admin);
    }

    // Összes felhasználó lekérdezése
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    // Adott id-jű felhasználó lekérdezése
    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    // Regisztrálás
    public ResponseEntity<?> registerUser(RegisterUserRequest request) {
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());

        // Ha már van megadott névvel felhasználó akkor hiba
        if (existingUser.isPresent()) {
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("code", "123");
            responseBody.put("message", "Username already exists.");
            return ResponseEntity.badRequest().body(responseBody);
        }

        // Egyébként új felhasználó elmentése titkosított jelszóval
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encoder.getPasswordEncoder().encode(request.getPassword()));
        Authority userAuthority = authorityRepository.findByAuthority("USER").orElse(null);
        user.getAuthorities().add(userAuthority);
        userRepository.save(user);
        return ResponseEntity.ok("User saved");
    }

    // Adott id-jű felhasználó törlése
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // top10 nyert meccsek szerint
    public List<User> findTop10User() {
        return userRepository.findTop10ByOrderByGamesWonDesc();
    }

    // Új jelszó beállítása
    public ResponseEntity<?> changePassword(String username, String oldPassword, String newPassword) {
        // Van-e a válaszban megadott felhasználónevű felhasználó
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }

        // Jó-e a megadott régi jelszó
        String storedPassword = user.get().getPassword();
        if (!encoder.getPasswordEncoder().matches(oldPassword, storedPassword)) {
            return ResponseEntity.badRequest().body("Bad credentials");
        }

        // Ha mindenen átmegy, akkor jelszó megváltoztatása
        user.get().setPassword(encoder.getPasswordEncoder().encode(newPassword));
        userRepository.save(user.get());
        return ResponseEntity.ok("Password changed");
    }

    // Admin jogok adása
    public ResponseEntity<?> promoteUser(Long id) {
        // Van-e ilyen id-jű felhasználó
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }

        // Admin jogosultág lekérése a db-ből és beállítása a user jogosultságai közé
        Authority adminAuthority = authorityRepository.findByAuthority("ADMIN").orElse(null);
        user.get().getAuthorities().add(adminAuthority);
        userRepository.save(user.get());
        return ResponseEntity.ok("User Promoted");
    }

    // Admin jogosultság elvétele, úgy mint az előző csak ez kitörli...
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

    // db-ben lévő userek száma
    public int countUsers() {
        return (int) userRepository.count();
    }

    // db-ben lévő admin userek száma
    public int countMods() {
        return userRepository.countByAuthoritiesAuthority("ADMIN");
    }

    // nyertes meccs esetén
    public void winner(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return;
        }
        user.get().setGamesPlayed(user.get().getGamesPlayed() + 1);
        user.get().setGamesWon(user.get().getGamesWon() + 1);
        userRepository.save(user.get());
    }

    // vesztett meccs esetén
    public void loser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return;
        }
        user.get().setGamesPlayed(user.get().getGamesPlayed() + 1);
        userRepository.save(user.get());
    }
}
