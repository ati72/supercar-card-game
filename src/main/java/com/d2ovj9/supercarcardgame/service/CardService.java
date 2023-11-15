package com.d2ovj9.supercarcardgame.service;

import com.d2ovj9.supercarcardgame.entity.Card;
import com.d2ovj9.supercarcardgame.repository.CardRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.NoSuchElementException;
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

    public void updateCard(Long id, Card card) {
        Optional<Card> cardToUpdate = Optional.ofNullable(cardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Card not found")));
        if (cardToUpdate.isPresent()) {
            if (card.getManufacturer() != null && !card.getManufacturer().trim().isEmpty()) {
                cardToUpdate.get().setManufacturer(card.getManufacturer());
            }
            if (card.getType() != null && !card.getType().trim().isEmpty()) {
                cardToUpdate.get().setType(card.getType());
            }
            if (card.getHorsePower() != 0) {
                cardToUpdate.get().setHorsePower(card.getHorsePower());
            }
            if (card.getTopSpeed() != 0) {
                cardToUpdate.get().setTopSpeed(card.getTopSpeed());
            }
            if (card.getDescription() != null && !card.getDescription().trim().isEmpty()) {
                cardToUpdate.get().setDescription(card.getDescription());
            }
            if (card.getProductionYear() != 0) {
                cardToUpdate.get().setProductionYear(card.getProductionYear());
            }
            if (card.getDisplacement() != 0) {
                cardToUpdate.get().setDisplacement(card.getDisplacement());
            }
            if (card.getImageUrl() != null && !card.getImageUrl().trim().isEmpty()) {
                cardToUpdate.get().setImageUrl(card.getImageUrl());
            }
            cardRepository.save(cardToUpdate.get());
        }

    }

    public int countCards() {
        return (int) cardRepository.count();
    }
}
