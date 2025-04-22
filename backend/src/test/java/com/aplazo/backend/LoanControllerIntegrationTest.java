package com.aplazo.backend;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class LoanControllerIntegrationTest {
    @Autowired
    MockMvc mvc;

    @Test void createCustomerAndLoan() throws Exception {
        String custJson = """
      {"firstName":"Luis","lastName":"Ramírez","secondLastName":"Diaz","dateOfBirth":"1985-05-05"}
      """;
        MvcResult r1 = mvc.perform(post("/v1/customers")
                        .contentType("application/json")
                        .content(custJson))
                .andExpect(status().isCreated())
                .andReturn();

        String token = r1.getResponse().getHeader("X-Auth-Token");
        String body = r1.getResponse().getContentAsString();
        // extraer customerId del body (p.ej. con Jackson)

        // Luego crea un préstamo usando token…
    }
}
