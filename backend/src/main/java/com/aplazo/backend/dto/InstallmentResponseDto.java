package com.aplazo.backend.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class InstallmentResponseDto {
    private Double amount;
    private LocalDate scheduledPaymentDate;
    private String status;
}
