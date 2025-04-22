package com.aplazo.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class LoanRequestDto {
    @NotNull private UUID customerId;
    @NotNull @Positive private Double amount;
}
