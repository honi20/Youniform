package com.youniform.api.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // diary error code
    DIARY_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 다이어리 ID 입니다."),
    INVALID_DIARY_DATE(HttpStatus.BAD_REQUEST.value(), "잘못된 다이어리 날짜 형식입니다. 올바른 날짜는 yyyy-mm-dd 형식을 따릅니다."),
    INVALID_DIARY_CONTENTS(HttpStatus.BAD_REQUEST.value(), "잘못된 다이어리 컨텐츠 형식입니다."),
    INVALID_DIARY_SCOPE(HttpStatus.BAD_REQUEST.value(), "잘못된 다이어리 공개 범위입니다. 공개 범위는 ALL, FRIENDS, PRIVATE 중에 하나입니다."),
    STAMP_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 스탬프 ID 입니다."),
    DIARY_UPDATE_FORBIDDEN(HttpStatus.FORBIDDEN.value(), "로그인 유저와 다이어리 작성자가 일치하지 않습니다."),
    WRITER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 유저(다이어리 작성자) ID 입니다."),
    // photocard error code
    PHOTOCARD_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 포토카드 ID 입니다."),
    EXPIRED_TOKEN(HttpStatus.BAD_REQUEST.value(), "만료된 토큰입니다."),
    NOT_VALID_TOKEN(HttpStatus.BAD_REQUEST.value(), "유효하지 않은 토큰입니다."),
    ;

    private final int httpStatusCode;

    private final String message;
}
