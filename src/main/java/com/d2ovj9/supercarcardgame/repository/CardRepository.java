package com.d2ovj9.supercarcardgame.repository;

import com.d2ovj9.supercarcardgame.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {

}
