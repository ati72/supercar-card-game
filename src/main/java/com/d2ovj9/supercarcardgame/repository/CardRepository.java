package com.d2ovj9.supercarcardgame.repository;

import com.d2ovj9.supercarcardgame.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {

}
