package com.d2ovj9.supercarcardgame.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    @NotBlank(message = "Username must not be empty.")
    @Size(min = 3, message = "Username must be at least 3 characters long.")
    @Size(max = 20, message = "Username must be shorter than 20 characters.")
    private String username;

    @Column(name = "password")
    @NotBlank(message = "Password must not be empty.")
    @Size(min = 3, message = "Password must be at least 3 characters long.")
    @JsonIgnore
    private String password;

    @Column(name = "games_played")
    private int gamesPlayed;

    @Column(name = "games_won")
    private int gamesWon;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    //@JsonIgnore
    private List<Authority> authorities = new ArrayList<>();

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // getAuthorities?
}
