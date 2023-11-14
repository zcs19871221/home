package com.cs.home.common;

import lombok.Data;

import java.time.Instant;

@Data
public class AuditableResponse {
    private Instant createdAt;

    private Instant lastModifiedAt;
}
