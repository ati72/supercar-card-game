package com.d2ovj9.supercarcardgame.controller;

import com.d2ovj9.supercarcardgame.dto.NewPasswordRequest;
import com.d2ovj9.supercarcardgame.dto.RegisterUserRequest;
import com.d2ovj9.supercarcardgame.entity.User;
import com.d2ovj9.supercarcardgame.service.UserService;
import com.d2ovj9.supercarcardgame.util.CustomPasswordEncoder;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    public void createAuthorities() {
        userService.createAuthorities();
        System.out.println("Authorities Created");
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

    @GetMapping("initAdmin")
    public ResponseEntity<?> createAdmin() {
        userService.createAdmin();
        return ResponseEntity.ok("Admin created");
    }

    @PostMapping ("/register")
    public ResponseEntity<?> register (@Valid @RequestBody RegisterUserRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println(bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body("Bad Request");
        }

        return userService.registerUser(request);

    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@Valid @RequestBody NewPasswordRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Bad Request");
        }
        return userService.changePassword(request.getUsername(), request.getOldPassword(), request.getNewPassword());
    }

    @PutMapping("/promote/{id}")
    public ResponseEntity<?> promoteUser(@PathVariable Long id) {
        return userService.promoteUser(id);
    }

    @PutMapping("demote/{id}")
    public ResponseEntity<?> demoteUser(@PathVariable Long id) {
        return userService.demoteUser(id);
    }

    @PutMapping("winner/{id}")
    public ResponseEntity<?> winner(@PathVariable Long id) {
        userService.winner(id);
        return ResponseEntity.ok("User games updated");
    }

    @PutMapping("loser/{id}")
    public ResponseEntity<?> loser(@PathVariable Long id) {
        userService.loser(id);
        return ResponseEntity.ok("User games updated");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }

    //TODO: majd kéne vmi amivel promotolni lehet user-t adminná

}
