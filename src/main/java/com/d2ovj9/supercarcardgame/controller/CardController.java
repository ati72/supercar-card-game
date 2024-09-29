package com.d2ovj9.supercarcardgame.controller;

import com.d2ovj9.supercarcardgame.response.StatsResponse;
import com.d2ovj9.supercarcardgame.entity.Card;
import com.d2ovj9.supercarcardgame.service.CardService;
import com.d2ovj9.supercarcardgame.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<List<Card>> getAllCards() {
        List<Card> cards = cardService.getAllCards();
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Card>> getCard(@PathVariable Long id) {
        Optional<Card> card = cardService.getCard(id);
        return ResponseEntity.ok(card);
    }

    // TODO: create statsController for this...
    @GetMapping("/getStats")
    public ResponseEntity<?> getStats() {
        int numOfCards = cardService.countCards();
        int numOfUsers = userService.countUsers();
        int numOfMods = userService.countMods();

        StatsResponse response = new StatsResponse();
        response.setNumOfCards(numOfCards);
        response.setNumOfUsers(numOfUsers);
        response.setNumOfMods(numOfMods);

        return ResponseEntity.ok(response);
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
         cardService.updateCard(id, card);
         return ResponseEntity.ok("Card updated");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable Long id) {
        cardService.deleteCard(id);
        return ResponseEntity.ok("Card deleted");
    }




}
