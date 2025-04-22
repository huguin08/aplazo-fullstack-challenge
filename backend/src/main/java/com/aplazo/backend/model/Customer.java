package com.aplazo.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Customer {
    @Id
    private UUID id = UUID.randomUUID();

    @Column(nullable = false)
    private String firstName, lastName, secondLastName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private Double creditLineAmount;

    @Column(nullable = false)
    private Double availableCreditLineAmount;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}