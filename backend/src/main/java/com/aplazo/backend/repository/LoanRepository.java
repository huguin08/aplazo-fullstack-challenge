package com.aplazo.backend.repository;

import com.aplazo.backend.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface LoanRepository extends JpaRepository<Loan, UUID> {}
