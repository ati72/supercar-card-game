package com.d2ovj9.supercarcardgame.controller;

import com.d2ovj9.supercarcardgame.dto.RegisterUserRequest;
import com.d2ovj9.supercarcardgame.entity.User;
import com.d2ovj9.supercarcardgame.service.UserService;
import com.d2ovj9.supercarcardgame.util.CustomPasswordEncoder;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final CustomPasswordEncoder encoder;

    @Autowired
    public UserController(UserService userService, CustomPasswordEncoder encoder) {
        this.userService = userService;
        this.encoder = encoder;
    }

    @PostConstruct
    public void createAdmin() {
        userService.createAdmin();
        System.out.println("Admin Created");
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUser() {
        List<User> users = userService.getAllUser();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable Long id) {
        // TODO: talán valami mást kiküldeni, mint null, ha nem talált usert
        Optional<User> user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/top")
    public ResponseEntity<List<User>> getTop10Users() {
        List<User> users = userService.findTop10User();
        return ResponseEntity.ok(users);
    }

    @PostMapping ("/register")
    public ResponseEntity<?> register (@RequestBody RegisterUserRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encoder.getPasswordEncoder().encode(request.getPassword()));
        userService.registerUser(user);
        return ResponseEntity.ok("User saved");
    }

//TODO front-end request dto -- field whick tells if game is won
//    @PutMapping("/update_stats/{id}")
//    public ResponseEntity<?> updateStats(@RequestBody ide kell egy dto request, @PathVariable Long id) {
//        Optional<User> userToUpdate = userService.getUser(id);
//        User user = userToUpdate.get();
//        if (megynerte a meccset) {
//            user.setGamesPlayed(user.getGamesPlayed() + 1);
//            user.setGamesWon(user.getGamesWon() + 1);
//        } else if (nem nyert) {
//            user.setGamesPlayed(user.getGamesPlayed() + 1);
//        }
//        userService.registerUser(user);
//        return ResponseEntity.ok("User updated");
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }

    //TODO: majd kéne vmi amivel promotolni lehet user-t adminná

}
