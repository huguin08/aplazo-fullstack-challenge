package com.aplazo.backend.dto;

import lombok.*;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PaymentPlanDto {
    private Double commissionAmount;
    private List<InstallmentResponseDto> installments;
}
