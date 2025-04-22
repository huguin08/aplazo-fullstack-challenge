package com.aplazo.backend.dto;

import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CustomerResponseDto {
    private UUID id;
    private Instant createdAt;
    private Double creditLineAmount;
    private Double availableCreditLineAmount;
}
