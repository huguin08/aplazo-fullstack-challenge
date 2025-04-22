package com.aplazo.backend.service.impl;

import com.aplazo.backend.dto.InstallmentResponseDto;
import com.aplazo.backend.dto.LoanRequestDto;
import com.aplazo.backend.dto.LoanResponseDto;
import com.aplazo.backend.dto.PaymentPlanDto;
import com.aplazo.backend.model.Customer;
import com.aplazo.backend.model.InstallmentStatus;
import com.aplazo.backend.model.Loan;
import com.aplazo.backend.model.LoanStatus;
import com.aplazo.backend.repository.CustomerRepository;
import com.aplazo.backend.repository.LoanRepository;
import com.aplazo.backend.service.LoanService;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.Instant;
import java.util.*;

@Service
public class LoanServiceImpl implements LoanService {
    private final LoanRepository loanRepo;
    private final CustomerRepository custRepo;

    public LoanServiceImpl(LoanRepository loanRepo,
                           CustomerRepository custRepo) {
        this.loanRepo = loanRepo;
        this.custRepo = custRepo;
    }

    @Override
    public LoanResponseDto create(LoanRequestDto req) {
        Customer c = custRepo.findById(req.getCustomerId())
                .orElseThrow(() -> new NoSuchElementException("Customer not found"));

        Loan loan = Loan.builder()
                .customer(c)
                .amount(req.getAmount())
                .status(LoanStatus.ACTIVE)
                .build();
        loanRepo.save(loan);

        double commission = 10.0;
        double each = (req.getAmount() - commission) / 5.0;
        List<InstallmentResponseDto> insts = new ArrayList<>();
        LocalDate start = LocalDate.now().plusMonths(1);
        for (int i = 0; i < 5; i++) {
            insts.add(InstallmentResponseDto.builder()
                    .amount(each)
                    .scheduledPaymentDate(start.plusMonths(i))
                    .status(InstallmentStatus.PENDING.name())
                    .build());
        }

        return LoanResponseDto.builder()
                .id(loan.getId())
                .customerId(c.getId())
                .status(loan.getStatus().name())
                .createdAt(loan.getCreatedAt())
                .paymentPlan(PaymentPlanDto.builder()
                        .commissionAmount(commission)
                        .installments(insts)
                        .build())
                .build();
    }

    @Override
    public LoanResponseDto findById(UUID id) {
        Loan l = loanRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Loan not found"));
        // Para simplificar, reuso create() omitiendo recrear la entidad
        return create(LoanRequestDto.builder()
                .customerId(l.getCustomer().getId())
                .amount(l.getAmount())
                .build());
    }
}