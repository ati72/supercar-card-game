package com.d2ovj9.supercarcardgame.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank(message = "Manufacturer cannot be blank")
    private String manufacturer;

    @Column(name = "type")
    @NotBlank(message = "Type cannot be blank")
    private String type;

    @Column(name = "production_year")
    @NotNull(message = "Production year cannot be null")
    private int productionYear;

    @Column(name = "top_speed")
    @NotNull(message = "Top speed cannot be null")
    private int topSpeed;

    @Column(name = "horse_power")
    @NotNull(message = "Horsepower cannot be null")
    private int horsePower;

    @Column(name = "displacement")
    @NotNull(message = "Displacement cannot be null")
    private float displacement;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;
}
