package com.aplazo.backend.dto;

import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class LoanResponseDto {
    private UUID id;
    private UUID customerId;
    private String status;
    private Instant createdAt;
    private PaymentPlanDto paymentPlan;
}