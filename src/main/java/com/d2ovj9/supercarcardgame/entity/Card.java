package com.d2ovj9.supercarcardgame.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "card")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "type")
    private String type;

    @Column(name = "production_year")
    private int productionYear;

    @Column(name = "top_speed")
    private int topSpeed;

    @Column(name = "horse_power")
    private int horsePower;

    @Column(name = "displacement")
    private float displacement;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;
}
