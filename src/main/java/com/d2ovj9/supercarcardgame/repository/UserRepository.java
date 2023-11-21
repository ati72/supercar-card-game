package com.d2ovj9.supercarcardgame.repository;

import com.d2ovj9.supercarcardgame.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Felhasználó felhasználónév alapján
    Optional<User> findByUsername(String username);
    // Top10 felhasználó nyert játszma szerint
    List<User> findTop10ByOrderByGamesWonDesc();
    // Felhasználók száma adott jogosultság szerint
    int countByAuthoritiesAuthority(String authority);
}
