package com.d2ovj9.supercarcardgame.service;

import com.d2ovj9.supercarcardgame.entity.Card;
import com.d2ovj9.supercarcardgame.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {
    private final CardRepository cardRepository;

    @Autowired
    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Optional<Card> getCard(Long id) {
        return cardRepository.findById(id);
    }

    public void saveAllCards(List<Card> cards) {
        cardRepository.saveAll(cards);
    }

    public void saveCard(Card card) {
        cardRepository.save(card);
    }

    public void deleteCard(Long id) {
        cardRepository.deleteById(id);
    }


}
