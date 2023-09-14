package com.d2ovj9.supercarcardgame.service;

import com.d2ovj9.supercarcardgame.entity.User;
import com.d2ovj9.supercarcardgame.repository.UserRepository;
import com.d2ovj9.supercarcardgame.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public void registerUser(User user) {
        userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> findTop10User() {
        return userRepository.findTop10ByOrderByGamesWonDesc();
    }
}
