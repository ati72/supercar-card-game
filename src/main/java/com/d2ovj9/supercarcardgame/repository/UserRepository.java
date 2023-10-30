package com.d2ovj9.supercarcardgame.repository;

import com.d2ovj9.supercarcardgame.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findTop10ByOrderByGamesWonDesc();
    int countByAuthoritiesAuthority(String authority);
}
