package com.youniform.api.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    TEST(400, "ok")
    ;

    private final int httpStatusCode;

    private final String message;
}