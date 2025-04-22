package com.aplazo.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CustomerRequestDto {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @NotBlank private String secondLastName;
    @NotNull private LocalDate dateOfBirth;
}
