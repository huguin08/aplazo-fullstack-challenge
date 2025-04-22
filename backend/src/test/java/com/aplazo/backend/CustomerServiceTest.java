package com.aplazo.backend;

import com.aplazo.backend.dto.CustomerRequestDto;
import com.aplazo.backend.dto.CustomerResponseDto;
import com.aplazo.backend.service.CustomerService;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class CustomerServiceTest {
    @Autowired
    CustomerService svc;

    @Test void createAndFind() {
        CustomerRequestDto req = new CustomerRequestDto(
                "Ana","López","Pérez", LocalDate.of(1990,1,1)
        );
        CustomerResponseDto resp = svc.create(req);
        assertThat(resp.getId()).isNotNull();
        CustomerResponseDto fetched = svc.findById(resp.getId());
        assertThat(fetched.getId()).isEqualTo(resp.getId());
    }
}
