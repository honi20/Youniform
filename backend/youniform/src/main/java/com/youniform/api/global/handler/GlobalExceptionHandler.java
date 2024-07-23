package com.youniform.api.global.handler;

import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.exception.CustomException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    protected ResponseDto<?> handleException(Exception e) {
        return ResponseDto.fail(e.getMessage());
    }

    @ExceptionHandler(CustomException.class)
    protected ResponseDto<?> handleCustomException(CustomException e) {
        return ResponseDto.fail(e.getErrorCode());
    }
}