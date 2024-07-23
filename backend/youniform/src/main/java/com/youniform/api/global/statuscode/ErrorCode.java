package com.youniform.api.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    ;

    private final int httpStatusCode;

    private final String message;
}
