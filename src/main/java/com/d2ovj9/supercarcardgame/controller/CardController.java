package com.d2ovj9.supercarcardgame.controller;

import com.d2ovj9.supercarcardgame.entity.Card;
import com.d2ovj9.supercarcardgame.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("")
    public ResponseEntity<List<Card>> getAllCards() {
        List<Card> cards = cardService.getAllCards();
        return ResponseEntity.ok(cards);
    }

    // TODO: optional-öket orelsethrow.... mindenhova exceptionök....
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Card>> getCard(@PathVariable Long id) {
        Optional<Card> card = cardService.getCard(id);
        return ResponseEntity.ok(card);
    }

    @PostMapping("/saveAll")
    public ResponseEntity<?> saveAllCards(@RequestBody List<Card> cards) {
        cardService.saveAllCards(cards);
        return ResponseEntity.ok("Cards saved");
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveCard(@RequestBody Card card) {
        cardService.saveCard(card);
        return ResponseEntity.ok("Cards saved");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCard(@RequestBody Card card, @PathVariable Long id) {
         cardService.saveCard(card);
         return ResponseEntity.ok("Card updated");
        // ????? hogyvót
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable Long id) {
        cardService.deleteCard(id);
        return ResponseEntity.ok("Card deleted");
    }

    // TODO exceptionök, ne ok-t küldjön vissza, ha besült valami... + PUT req edit



}
