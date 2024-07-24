package com.youniform.api.global.dto;

import com.youniform.api.global.statuscode.ErrorCode;
import com.youniform.api.global.statuscode.SuccessCode;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ResponseDto<T> {
    private ResponseHeader header;

    private T body;

    public static <T> ResponseDto<T> success(SuccessCode s, T body) {
        return new ResponseDto<>(new ResponseHeader(s), body);
    }

    public static <T> ResponseDto<T> fail(ErrorCode e) {
        return new ResponseDto<>(new ResponseHeader(e), null);
    }

    public static <T> ResponseDto<T> fail(String errorMessage) {
        return new ResponseDto<>(new ResponseHeader(HttpStatus.BAD_REQUEST.value(), errorMessage), null);
    }
}
