package com.youniform.api.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    //user
    USER_NICKNAME_OK(HttpStatus.OK.value(), "사용 가능한 닉네임입니다."),
    VERIFY_CODE_SEND(HttpStatus.OK.value(), "인증번호 발송에 성공했습니다."),
    EMAIL_VERIFIED(HttpStatus.OK.value(), "사용 가능한 이메일입니다."),
    PASSWORD_RESET_EMAIL_SEND(HttpStatus.OK.value(), "비밀번호 재설정 링크를 이메일로 발송했습니다."),
    PASSWORD_RESET_OK(HttpStatus.OK.value(), "비밀번호 재설정에 성공했습니다."),
    USER_DETAILS_OK(HttpStatus.OK.value(), "내 정보 조회에 성공했습니다."),
    PROFILE_MODIFIED(HttpStatus.OK.value(), "프로필 수정에 성공했습니다."),
    PASSWORD_MODIFIED(HttpStatus.OK.value(), "비밀번호 수정에 성공했습니다."),
    THEME_MODIFIED(HttpStatus.OK.value(), "테마 변경에 성공했습니다."),
    ALERT_MODIFIED(HttpStatus.OK.value(), "푸시 알림 변경에 성공했습니다."),
    USER_RESIGNED(HttpStatus.OK.value(), "회원 탈퇴에 성공했습니다."),
    USER_SIGNUP_USER(HttpStatus.OK.value(), "소셜 회원가입을 진행합니다."),
    USER_SIGNUP_EXIST(HttpStatus.OK.value(), "기존에 존재하는 회원정보가 있습니다."),
    USER_SIGNUP_SUCCESS(HttpStatus.OK.value(), "회원가입에 성공하였습니다."),
    USER_SIGNIN_SUCCESS(HttpStatus.OK.value(), "로그인에 성공하였습니다."),
    USER_FAVORITE_MODIFIED(HttpStatus.OK.value(), "최애 구단 및 선수 변경에 성공했습니다."),
    USER_RECOMMEND_SUCCESS(HttpStatus.OK.value(), "유저 추천에 성공했습니다"),
    USER_SEARCH_OK(HttpStatus.OK.value(), "유저 검색에 성공했습니다"),

    //friends
    FRIEND_REQUEST_OK(HttpStatus.CREATED.value(), "친구 요청에 성공했습니다."),
    FRIEND_ACCEPT_OK(HttpStatus.CREATED.value(), "친구 요청을 수락했습니다."),
    FRIEND_LIST_OK(HttpStatus.OK.value(), "친구 리스트 조회에 성공했습니다."),
    FRIEND_DELETED(HttpStatus.OK.value(), "친구 삭제에 성공했습니다."),

    // diary success code
    DIARY_CREATED(HttpStatus.CREATED.value(), "다이어리 저장에 성공했습니다."),
    DIARY_DETAILS_OK(HttpStatus.OK.value(), "다이어리 상세보기에 성공했습니다."),
    DIARY_MODIFIED(HttpStatus.OK.value(), "다이어리 수정에 성공했습니다."),
    DIARY_DELETED(HttpStatus.OK.value(), "다이어리 삭제에 성공했습니다."),
    MY_DIARIES_OK(HttpStatus.OK.value(), "로그인 유저의 다이어리 리스트 조회에 성공했습니다."),
    MY_MONTHLY_DIARIES_OK(HttpStatus.OK.value(), "로그인 유저의 월간 다이어리 리스트 조회에 성공했습니다."),
    OTHER_MONTHLY_DIARIES_OK(HttpStatus.OK.value(), "다른 유저의 월간 다이어리 리스트 조회에 성공했습니다."),
    OTHER_DIARIES_OK(HttpStatus.OK.value(), "다른 유저의 다이어리 리스트 조회에 성공했습니다."),
    DIARY_RESOURCES_OK(HttpStatus.OK.value(), "다이어리 리소스 리스트 조회에 성공했습니다."),
    DIARY_STAMP_OK(HttpStatus.OK.value(), "다이어리 스탬프 리스트 조회에 성공했습니다."),

    //post
    POST_CREATED(HttpStatus.CREATED.value(), "게시글 생성에 성공했습니다."),
    PUBLIC_POST_LIST_OK(HttpStatus.OK.value(), "전체 게시글 조회에 성공했습니다."),
    MY_POST_LIST_OK(HttpStatus.OK.value(), "나의 게시글 조회에 성공했습니다."),
    FRIEND_POST_LIST_OK(HttpStatus.OK.value(), "친구 게시글 조회에 성공했습니다."),
    LIKED_POST_LIST_OK(HttpStatus.OK.value(), "좋아요한 게시글 조회에 성공했습니다."),
    TAG_POST_LIST_OK(HttpStatus.OK.value(), "태그가 포함된 게시글 조회에 성공했습니다."),
    POST_DETAILS_OK(HttpStatus.OK.value(), "게시글 상세보기에 성공했습니다."),
    POST_MODIFIED(HttpStatus.OK.value(), "게시글 수정에 성공했습니다."),
    POST_DELETED(HttpStatus.OK.value(), "게시글 삭제에 성공했습니다"),

    TAG_LIST_OK(HttpStatus.OK.value(), "태그 검색에 성공했습니다."),

    //comment
    COMMENT_CREATED(HttpStatus.CREATED.value(), "댓글 생성에 성공했습니다."),
    COMMENT_LIST_OK(HttpStatus.OK.value(), "댓글 조회에 성공했습니다."),
    COMMENT_MODIFIED(HttpStatus.OK.value(), "댓글 수정에 성공했습니다."),
    COMMENT_DELETED(HttpStatus.OK.value(), "댓글 삭제에 성공했습니다."),

    // photocard success code
    PHOTOCARD_CREATED(HttpStatus.CREATED.value(), "포토카드 생성에 성공했습니다."),
    PHOTOCARD_DETAILS_OK(HttpStatus.OK.value(), "포토카드 상세보기에 성공했습니다."),
    PHOTOCARD_DELETED(HttpStatus.OK.value(), "포토카드 삭제에 성공했습니다."),
    PHOTOCARD_LIST_OK(HttpStatus.OK.value(), "포토카드 리스트 조회에 성공했습니다."),

    // likes success code
    LIKES_STATUS_OK(HttpStatus.OK.value(), "좋아요 상태가 저장됐습니다."),
    REISSUED_ACCESSTOKEN(HttpStatus.FORBIDDEN.value(), "accessToken이 재발급 됐습니다."),

    // alert success code
    ALERT_CONNECTION_OK(HttpStatus.OK.value(), "알림 설정 연결에 성공했습니다."),
    ALERT_LIST_OK(HttpStatus.OK.value(), "알림함 리스트 조회에 성공했습니다."),
    ALERT_READ_MODIFIED(HttpStatus.OK.value(), "알림 읽음 처리에 성공했습니다."),
    ALERT_DELETED(HttpStatus.OK.value(), "알림 삭제에 성공했습니다."),
    ALERT_PLAYER_APPEARANCE_OK(HttpStatus.OK.value(), "선수 등장 알림 전송에 성공했습니다."),

    // chat success code
    CHATROOM_DETAILS_OK(HttpStatus.OK.value(), "채팅방 조회에 성공했습니다."),
    CHATROOM_LIST_OK(HttpStatus.OK.value(), "채팅방 리스트 조회에 성공했습니다."),
    IMAGE_UPLOAD_OK(HttpStatus.OK.value(), "이미지 업로드에 성공했습니다."),
    IMAGE_DOWNLOAD_OK(HttpStatus.OK.value(), "이미지 다운로드에 성공했습니다."),

    // player success code
    PLAYER_LIST_OK(HttpStatus.OK.value(), "선수 리스트 조회에 성공했습니다"),
    FAVORITE_PLAYER_LIST_OK(HttpStatus.OK.value(), "최애 선수 리스트 조회에 성공했습니다."),
    PLAYER_SONG_LIST_OK(HttpStatus.OK.value(), "선수 응원가 리스트 조회에 성공했습니다."),

    // team success code
    TEAM_SONG_LIST_OK(HttpStatus.OK.value(), "최애 구단 응원가 리스트 조회에 성공했습니다."),
    TEAM_DETAILS_OK(HttpStatus.OK.value(), "최애 구단 정보 조회에 성공했습니다."),
    ;

    private final int httpStatusCode;

    private final String message;
}