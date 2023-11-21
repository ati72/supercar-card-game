package com.d2ovj9.supercarcardgame.service;

import com.d2ovj9.supercarcardgame.entity.User;
import com.d2ovj9.supercarcardgame.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Felhasználó betöltése felhasználónév alapján, Spring Security használja
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
    }
}
