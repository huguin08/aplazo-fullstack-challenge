package com.aplazo.backend.config;

import com.aplazo.backend.security.AuthTokenFilter;
import com.aplazo.backend.security.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtUtils jwtUtils;
    public SecurityConfig(JwtUtils jwtUtils) { this.jwtUtils = jwtUtils; }

    @Bean
    public SecurityFilterChain securityFilterChain(org.springframework.security.config.annotation.web.builders.HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Deja pasar el JSON y la UI de Swagger
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/webjars/**"
                        ).permitAll()
                        // POST /v*/customers público
                        .requestMatchers("/v*/customers").permitAll()
                        // resto requiere JWT
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new AuthTokenFilter(jwtUtils),
                        UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}