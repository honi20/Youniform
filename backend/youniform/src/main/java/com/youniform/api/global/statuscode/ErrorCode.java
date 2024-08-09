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
    PROFILE_MOIDFY_FAILED(HttpStatus.BAD_REQUEST.value(), "프로필을 변경하지 못하였습니다."),
    PROFILE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "프로필을 찾지 못하였습니다."),
    ALREADY_EXIST_NICKNAME(HttpStatus.BAD_REQUEST.value(), "이미 사용중인 닉네임입니다."),
    ALREADY_EXIST_EMAIL(HttpStatus.BAD_REQUEST.value(), "이미 사용중인 이메일입니다."),
    PASSWORD_NOT_MATCH(HttpStatus.BAD_REQUEST.value(), "비밀번호가 일치하지 않습니다."),
    INVALID_EMAIL(HttpStatus.BAD_REQUEST.value(), "잘못된 이메일입니다."),
    TEMP_PASSWORD_TIMEOUT(HttpStatus.FORBIDDEN.value(), "인증시간이 만료되었습니다."),
    VERIFY_NOT_MATCH(HttpStatus.BAD_REQUEST.value(), "인증번호가 일치하지 않습니다."),
    FAIL_SEND_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR.value(), "메일을 보내지 못하였습니다."),
    ALREADY_EXIST_USER(HttpStatus.BAD_REQUEST.value(), "이미 사용중인 이메일입니다."),

    // mail error code
    MAIL_SEND_FAILURE(HttpStatus.BAD_REQUEST.value(), "이메일을 전송하지 못하였습니다."),
    NOT_EXIST_VERIFY(HttpStatus.BAD_REQUEST.value(), "인증정보가 존재하지 않습니다."),

    // diary error code
    DIARY_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 다이어리 ID 입니다."),
    INVALID_DIARY_DATE(HttpStatus.BAD_REQUEST.value(), "잘못된 다이어리 날짜 형식입니다. 올바른 날짜는 yyyy-mm-dd 형식을 따릅니다."),
    INVALID_DIARY_CONTENTS(HttpStatus.BAD_REQUEST.value(), "잘못된 다이어리 컨텐츠 형식입니다."),
    INVALID_DIARY_SCOPE(HttpStatus.BAD_REQUEST.value(), "잘못된 다이어리 공개 범위입니다. 공개 범위는 ALL, FRIENDS, PRIVATE 중에 하나입니다."),
    STAMP_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 스탬프 ID 입니다."),
    DIARY_UPDATE_FORBIDDEN(HttpStatus.FORBIDDEN.value(), "다이어리 업데이트가 불가능합니다. 작성자만 수정이 가능하고, 다이어리 날짜는 수정 불가능합니다."),
    WRITER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 유저(다이어리 작성자) ID 입니다."),
    INVALID_CALENDAR_DATE(HttpStatus.BAD_REQUEST.value(), "잘못된 캘린더 날짜 형식입니다. yyyy-mm 형식을 따릅니다."),
    DIARY_ACCESS_FORBIDDEN(HttpStatus.FORBIDDEN.value(), "다이어리 접근 권한이 없습니다. (공개 범위에 따른 접근 권한)"),

    // photocard error code
    PHOTOCARD_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 포토카드 ID 입니다."),
    PHOTOCARD_ACCESS_FORBIDDEN(HttpStatus.FORBIDDEN.value(), "포토카드 접근 권한이 없습니다.(작성자만 접근 가능)"),

    //token
    EXPIRED_TOKEN(HttpStatus.BAD_REQUEST.value(), "만료된 토큰입니다."),
    NOT_VALID_TOKEN(HttpStatus.BAD_REQUEST.value(), "유효하지 않은 토큰입니다."),

    //file
    FILE_UPLOAD_FAIL(HttpStatus.BAD_GATEWAY.value(), "파일 업로드에 실패했습니다."),
    FILE_DOWNLOAD_FAIL(HttpStatus.BAD_GATEWAY.value(), "파일 다운로드에 실패했습니다."),
    FILE_DELETE_FAIL(HttpStatus.BAD_REQUEST.value(), "파일 삭제에 실패했습니다"),
    FILE_EXTENSION_FAIL(HttpStatus.BAD_REQUEST.value(), "파일 확장자는 jpg, jpeg, png만 가능합니다"),

    //friend error code
    FRIEND_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "친구를 찾을 수 없습니다."),

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
    POST_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유효하지 않은 게시글 ID 입니다."),
    POST_UPDATE_FORBIDDEN(HttpStatus.FORBIDDEN.value(), "게시글 수정은 작성자만 수정이 가능합니다."),
    POST_DELETE_FORBIDDEN(HttpStatus.FORBIDDEN.value(), "게시글 삭제는 작성자만 가능합니다."),

    // player error
    PLAYER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당 선수를 찾을 수 없습니다."),
    TEAM_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당 구단을 찾을 수 없습니다."),

    //comment error
    INVALID_COMMENT_CONTENTS(HttpStatus.BAD_REQUEST.value(), "댓글은 null이거나 공백일 수 없습니다."),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "댓글을 찾을 수 없습니다."),
    COMMENT_UPDATE_FORBIDDEN(HttpStatus.FORBIDDEN.value(), "댓글 수정은 작성자만 가능합니다."),
    COMMENT_DELETE_FORBIDDEN(HttpStatus.FORBIDDEN.value(), "댓글 삭제는 작성자만 가능합니다.")
    ;

    private final int httpStatusCode;

    private final String message;
}
