package com.youniform.api.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;

@Data
@AllArgsConstructor
public class ChatDownloadImageRes {
    private InputStreamResource resource;

    private HttpHeaders headers;

    public ChatDownloadImageRes() {
    }

    public void setResource(InputStreamResource resource) {
        this.resource = resource;
    }

    public void setHeaders(HttpHeaders headers) {
        this.headers = headers;
    }
}