package com.d2ovj9.supercarcardgame.repository;

import com.d2ovj9.supercarcardgame.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    // Jogosultság jogosultság neve szerint
    Optional<Authority> findByAuthority(String authority);
}
