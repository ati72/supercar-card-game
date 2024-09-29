package com.d2ovj9.supercarcardgame.controller;

import com.d2ovj9.supercarcardgame.request.NewPasswordRequest;
import com.d2ovj9.supercarcardgame.request.RegisterUserRequest;
import com.d2ovj9.supercarcardgame.entity.User;
import com.d2ovj9.supercarcardgame.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUser() {
        List<User> users = userService.getAllUser();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable Long id) {
        Optional<User> user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/top")
    public ResponseEntity<List<User>> getTop10Users() {
        List<User> users = userService.findTop10User();
        return ResponseEntity.ok(users);
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

}
