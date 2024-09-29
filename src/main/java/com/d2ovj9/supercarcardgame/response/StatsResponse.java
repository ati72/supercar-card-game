package com.d2ovj9.supercarcardgame.response;

import lombok.Data;

@Data
public class StatsResponse {

    // DTO az admin oldal információk kiküldésére

    private int numOfCards;
    private int numOfUsers;
    private int numOfMods;
}
