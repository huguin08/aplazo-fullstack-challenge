package com.aplazo.backend.controller;

import com.aplazo.backend.dto.LoanRequestDto;
import com.aplazo.backend.dto.LoanResponseDto;
import com.aplazo.backend.service.LoanService;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/{apiVersion}/loans")
@Validated
public class LoanController {
    private final LoanService svc;

    public LoanController(LoanService svc) {
        this.svc = svc;
    }

    @PostMapping
    public ResponseEntity<LoanResponseDto> create(
            @PathVariable String apiVersion,
            @Valid @RequestBody LoanRequestDto req) {

        LoanResponseDto resp = svc.create(req);
        URI loc = URI.create("/" + apiVersion + "/loans/" + resp.getId());
        return ResponseEntity.created(loc).body(resp);
    }

    @GetMapping("/{loanId}")
    public ResponseEntity<LoanResponseDto> getById(
            @PathVariable UUID loanId) {
        return ResponseEntity.ok(svc.findById(loanId));
    }
}
