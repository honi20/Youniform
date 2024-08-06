package com.youniform.api.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // user error code
    USER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "사용자를 찾을 수 없습니다."),
    INVALID_SIGNUP(HttpStatus.BAD_REQUEST.value(), "잘못된 회원가입 요청입니다."),

    // diary error code
    DIARY_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 다이어리 ID 입니다."),
    INVALID_DIARY_DATE(HttpStatus.BAD_REQUEST.value(), "잘못된 다이어리 날짜 형식입니다. 올바른 날짜는 yyyy-mm-dd 형식을 따릅니다."),
    INVALID_DIARY_CONTENTS(HttpStatus.BAD_REQUEST.value(), "잘못된 다이어리 컨텐츠 형식입니다."),
    INVALID_DIARY_SCOPE(HttpStatus.BAD_REQUEST.value(), "잘못된 다이어리 공개 범위입니다. 공개 범위는 ALL, FRIENDS, PRIVATE 중에 하나입니다."),
    STAMP_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 스탬프 ID 입니다."),
    DIARY_UPDATE_FORBIDDEN(HttpStatus.FORBIDDEN.value(), "다이어리 업데이트가 불가능합니다. 작성자만 수정이 가능하고, 다이어리 날짜는 수정 불가능합니다."),
    WRITER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 유저(다이어리 작성자) ID 입니다."),

    // photocard error code
    PHOTOCARD_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 포토카드 ID 입니다."),

    //token
    EXPIRED_TOKEN(HttpStatus.BAD_REQUEST.value(), "만료된 토큰입니다."),
    NOT_VALID_TOKEN(HttpStatus.BAD_REQUEST.value(), "유효하지 않은 토큰입니다."),

    //file
    FILE_CONVERT_FAIL(HttpStatus.BAD_GATEWAY.value(), "파일 업로드에 실패했습니다."),
    FILE_DOWNLOAD_FAIL(HttpStatus.BAD_GATEWAY.value(), "파일 다운로드에 실패했습니다."),

    // chat error code
    CHATROOM_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "채팅방을 찾을 수 없습니다."),
    MESSAGE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "메세지를 찾을 수 없습니다."),
    CHATPART_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "채팅 참여 정보가 존재하지 않습니다."),

    // alert error code
    ALERT_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당 알림을 찾을 수 없습니다."),

    //post error
    INVALID_TAG_SIZE(HttpStatus.BAD_REQUEST.value(), "태그는 최대 10개까지 설정가능합니다."),
    INVALID_TAG_CONTENTS(HttpStatus.BAD_REQUEST.value(), "태그 내용은 최대 10자까지 설정가능합니다."),
    INVALID_TAG_FORM(HttpStatus.BAD_REQUEST.value(), "태그에는 띄어쓰기를 하실 수 없습니다."),
    ;

    private final int httpStatusCode;

    private final String message;
}
