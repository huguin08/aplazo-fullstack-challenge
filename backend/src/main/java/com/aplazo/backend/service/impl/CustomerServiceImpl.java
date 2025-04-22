package com.aplazo.backend.service.impl;

import com.aplazo.backend.dto.CustomerRequestDto;
import com.aplazo.backend.dto.CustomerResponseDto;
import com.aplazo.backend.model.Customer;
import com.aplazo.backend.repository.CustomerRepository;
import com.aplazo.backend.service.CustomerService;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository repo;
    public CustomerServiceImpl(CustomerRepository repo) {
        this.repo = repo;
    }

    @Override
    public CustomerResponseDto create(CustomerRequestDto req) {
        Customer c = Customer.builder()
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .secondLastName(req.getSecondLastName())
                .dateOfBirth(req.getDateOfBirth())
                .creditLineAmount(1000.0)
                .availableCreditLineAmount(1000.0)
                .build();
        repo.save(c);
        return CustomerResponseDto.builder()
                .id(c.getId())
                .createdAt(c.getCreatedAt())
                .creditLineAmount(c.getCreditLineAmount())
                .availableCreditLineAmount(c.getAvailableCreditLineAmount())
                .build();
    }

    @Override
    public CustomerResponseDto findById(UUID id) {
        Customer c = repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Customer not found"));
        return CustomerResponseDto.builder()
                .id(c.getId())
                .createdAt(c.getCreatedAt())
                .creditLineAmount(c.getCreditLineAmount())
                .availableCreditLineAmount(c.getAvailableCreditLineAmount())
                .build();
    }
}
