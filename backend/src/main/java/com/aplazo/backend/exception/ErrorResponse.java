package com.aplazo.backend.exception;

import lombok.*;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ErrorResponse {
    private String code;
    private String error;
    private long timestamp;
    private String message;
    private String path;
}