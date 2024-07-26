package com.youniform.api.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    TEST(400, "ok"),
    // diary success code
    DIARY_CREATED(HttpStatus.CREATED.value(), "다이어리 저장에 성공했습니다."),
    DIARY_DETAILS_OK(HttpStatus.OK.value(), "다이어리 상세보기에 성공했습니다."),
    DIARY_MODIFIED(HttpStatus.NO_CONTENT.value(), "다이어리 수정에 성공했습니다."),
    DIARY_DELETED(HttpStatus.NO_CONTENT.value(), "다이어리 삭제에 성공했습니다."),
    MY_DIARIES_OK(HttpStatus.OK.value(), "로그인 유저의 다이어리 리스트 조회에 성공했습니다."),
    OTHER_DIARIES_OK(HttpStatus.OK.value(), "다른 유저의 다이어리 리스트 조회에 성공했습니다."),
    DIARY_RESOURCES_OK(HttpStatus.OK.value(), "다이어리 리소스 리스트 조회에 성공했습니다."),
    ;

    private final int httpStatusCode;

    private final String message;
}