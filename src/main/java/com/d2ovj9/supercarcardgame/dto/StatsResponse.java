package com.d2ovj9.supercarcardgame.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StatsResponse {
    private int numOfCards;
    private int numOfUsers;
    private int numOfMods;
}
