package com.youniform.api.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    TEST(400, "ok"),
    SUCCESS(HttpStatus.OK.value(), "Success"),
    CREATED(HttpStatus.CREATED.value(), "Resource created successfully"),
    UPDATED(HttpStatus.OK.value(), "Resource updated successfully"),
    DELETED(HttpStatus.OK.value(), "Resource deleted successfully")
    ;

    private final int httpStatusCode;

    private final String message;
}