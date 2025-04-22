package com.aplazo.backend.controller;

import com.aplazo.backend.dto.CustomerRequestDto;
import com.aplazo.backend.dto.CustomerResponseDto;
import com.aplazo.backend.security.JwtUtils;
import com.aplazo.backend.service.CustomerService;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/{apiVersion}/customers")
@Validated
public class CustomerController {
    private final CustomerService svc;
    private final JwtUtils jwt;

    public CustomerController(CustomerService svc, JwtUtils jwt) {
        this.svc = svc;
        this.jwt = jwt;
    }

    @PostMapping
    public ResponseEntity<CustomerResponseDto> create(
            @PathVariable String apiVersion,
            @Valid @RequestBody CustomerRequestDto req) {

        CustomerResponseDto resp = svc.create(req);

        // Location header
        URI loc = URI.create("/" + apiVersion + "/customers/" + resp.getId());
        // X-Auth-Token header
        String token = jwt.generateJwt(resp.getId().toString());

        return ResponseEntity.created(loc)
                .header("X-Auth-Token", token)
                .body(resp);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerResponseDto> getById(
            @PathVariable UUID customerId) {
        return ResponseEntity.ok(svc.findById(customerId));
    }
}