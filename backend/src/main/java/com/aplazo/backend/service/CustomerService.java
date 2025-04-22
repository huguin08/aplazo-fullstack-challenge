package com.aplazo.backend.service;

import com.aplazo.backend.dto.CustomerRequestDto;
import com.aplazo.backend.dto.CustomerResponseDto;

import java.util.UUID;

public interface CustomerService {
    CustomerResponseDto create(CustomerRequestDto req);
    CustomerResponseDto findById(UUID id);
}
