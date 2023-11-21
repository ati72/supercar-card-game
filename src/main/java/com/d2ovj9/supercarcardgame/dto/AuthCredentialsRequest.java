package com.d2ovj9.supercarcardgame.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthCredentialsRequest {

    // DTO a kliens login formjához, kik kell tölteni mindkét mezőt, min 3 max 20 karakter

    @NotBlank(message = "Username must not be empty")
    @Size(min = 3, message = "Username must be at least 3 characters long.")
    @Size(max = 20, message = "Username must be shorter than 20 characters.")
    private String username;

    @NotBlank(message = "Password must not be empty")
    @Size(min = 3, message = "Password must be at least 3 characters long.")
    @Size(max = 20, message = "Password must be shorter than 20 characters.")
    private String password;
}
