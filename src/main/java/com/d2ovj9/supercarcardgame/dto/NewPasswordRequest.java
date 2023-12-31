package com.d2ovj9.supercarcardgame.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NewPasswordRequest {

    // DTO jelszó módosítás form-hoz

    @NotBlank(message = "Password must not be empty")
    @Size(min = 3, message = "Password must be at least 3 characters long.")
    @Size(max = 20, message = "Password must be shorter than 20 characters.")
    private String username;

    @NotBlank(message = "Password must not be empty")
    @Size(min = 3, message = "Password must be at least 3 characters long.")
    @Size(max = 20, message = "Password must be shorter than 20 characters.")
    private String oldPassword;

    @NotBlank(message = "Password must not be empty")
    @Size(min = 3, message = "Password must be at least 3 characters long.")
    @Size(max = 20, message = "Password must be shorter than 20 characters.")
    private String newPassword;

}
