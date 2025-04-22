package com.aplazo.backend.service;

import com.aplazo.backend.dto.LoanRequestDto;
import com.aplazo.backend.dto.LoanResponseDto;

import java.util.UUID;

public interface LoanService {
    LoanResponseDto create(LoanRequestDto req);
    LoanResponseDto findById(UUID id);
}
