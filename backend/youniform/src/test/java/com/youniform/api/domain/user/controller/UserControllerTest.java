package com.youniform.api.domain.user.controller;

import com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.google.gson.Gson;
import com.youniform.api.domain.user.dto.*;
import com.youniform.api.global.jwt.service.JwtService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.SuccessCode.*;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("유저 API 명세서")
@WithMockUser
public class UserControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private JwtService jwtService;

    @Test
    public void 닉네임_중복_검사_성공() throws Exception {
        //given
        String nickname = "bebe";

        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                get("/users/verify")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("nickname", nickname)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(USER_NICKNAME_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(USER_NICKNAME_OK.getMessage()))
                .andDo(document(
                        "닉네임 중복 검사 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("닉네임 중복 검사 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("nickname").description("닉네임")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("닉네임 중복 검사 Request"))
                                .responseSchema(Schema.schema("닉네임 중복 검사 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 이메일_인증번호_발송_성공() throws Exception {
        //given
        EmailSendReq emailSendReq = new EmailSendReq();
        emailSendReq.setEmail("test@gmail.com");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(emailSendReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/users/email/send")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(VERIFY_CODE_SEND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(VERIFY_CODE_SEND.getMessage()))
                .andDo(document(
                        "이메일 인증번호 발송 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("이메일 인증번호 발송 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("email").type(JsonFieldType.STRING)
                                                .description("이메일")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("이메일 인증번호 발송 Request"))
                                .responseSchema(Schema.schema("이메일 인증번호 발송 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 이메일_인증번호_확인_성공() throws Exception {
        //given
        String email = "test@gmail.com";
        String verifyCode = "234o2439dsgfsd09dg09";

        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                get("/users/email/verify")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("email", email)
                        .param("verifyCode", verifyCode)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(EMAIL_VERIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(EMAIL_VERIFIED.getMessage()))
                .andDo(document(
                        "이메일 인증 확인 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("이메일 인증번호 확인 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        List.of(
                                                parameterWithName("email").description("이메일"),
                                                parameterWithName("verifyCode").description("이메일 인증번호(UUID)")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("이메일 인증번호 확인 Request"))
                                .responseSchema(Schema.schema("이메일 인증번호 확인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 비밀번호_재설정_링크_발송_성공() throws Exception {
        //given
        PasswordResetSendReq passwordResetSendReq = new PasswordResetSendReq();
        passwordResetSendReq.setEmail("test@gmail.com");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(passwordResetSendReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/users/password/send")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PASSWORD_RESET_EMAIL_SEND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PASSWORD_RESET_EMAIL_SEND.getMessage()))
                .andDo(document(
                        "비밀번호 재설정 링크 발송 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("비밀번호 재설정 링크 발송 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("email").type(JsonFieldType.STRING)
                                                .description("이메일")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("비밀번호 재설정 링크 발송 Request"))
                                .responseSchema(Schema.schema("비밀번호 재설정 링크 발송 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 비밀번호_재설정_성공() throws Exception {
        //given
        PasswordResetReq passwordResetReq = new PasswordResetReq();
        passwordResetReq.setEmail("test@gmail.com");
        passwordResetReq.setPassword("password1321");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(passwordResetReq);

        //when
        ResultActions actions = mockMvc.perform(
                patch("/users/password/reset")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PASSWORD_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PASSWORD_MODIFIED.getMessage()))
                .andDo(document(
                        "비밀번호 재설정 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("비밀번호 재설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("email").type(JsonFieldType.STRING)
                                                .description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING)
                                                .description("비밀번호")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("비밀번호 재설정 Request"))
                                .responseSchema(Schema.schema("비밀번호 재설정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 비밀번호_변경_성공() throws Exception {
        //given
        PasswordModifyReq passwordModifyReq = new PasswordModifyReq();
        passwordModifyReq.setCurrentPassword("currentPassword1241231");
        passwordModifyReq.setNewPassword("newpassWordpr293r2039");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(passwordModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                patch("/users/password")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PASSWORD_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PASSWORD_MODIFIED.getMessage()))
                .andDo(document(
                        "비밀번호 재설정 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("비밀번호 재설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("currentPassword").type(JsonFieldType.STRING)
                                                .description("현재 비밀번호"),
                                        fieldWithPath("newPassword").type(JsonFieldType.STRING)
                                                .description("새로운 비밀번호")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("비밀번호 재설정 Request"))
                                .responseSchema(Schema.schema("비밀번호 재설정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 내_정보_조회_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                get("/users")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(USER_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(USER_DETAILS_OK.getMessage()))
                .andDo(document(
                        "내 정보 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("내 정보 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.nickname").type(JsonFieldType.STRING)
                                                        .description("회원 닉네임"),
                                                fieldWithPath("body.introduce").type(JsonFieldType.STRING)
                                                        .description("회원 한줄소개"),
                                                fieldWithPath("body.profileUrl").type(JsonFieldType.STRING)
                                                        .description("회원 프로필 Url"),
                                                fieldWithPath("body.theme").type(JsonFieldType.STRING)
                                                        .description("현재 테마"),
                                                fieldWithPath("body.pushAlert").type(JsonFieldType.BOOLEAN)
                                                        .description("푸시 알람 여부"),
                                                fieldWithPath("body.teamImage").type(JsonFieldType.STRING)
                                                        .description("응원하는 팀 이미지 url")
                                        )
                                )
                                .responseSchema(Schema.schema("내 정보 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 유저_정보_조회_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                get("/users/{userId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(USER_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(USER_DETAILS_OK.getMessage()))
                .andDo(document(
                        "유저 정보 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("유저 정보 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.userId").type(JsonFieldType.STRING)
                                                        .description("유저 아이디(UUID)"),
                                                fieldWithPath("body.nickname").type(JsonFieldType.STRING)
                                                        .description("회원 닉네임"),
                                                fieldWithPath("body.introduce").type(JsonFieldType.STRING)
                                                        .description("회원 한줄소개"),
                                                fieldWithPath("body.profileUrl").type(JsonFieldType.STRING)
                                                        .description("회원 프로필 Url"),
                                                fieldWithPath("body.teamImage").type(JsonFieldType.STRING)
                                                        .description("응원하는 팀 이미지 url")
                                        )
                                )
                                .responseSchema(Schema.schema("유저 정보 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 프로필_수정_성공() throws Exception {
        //given
        ProfileModifyReq profileModifyReq = new ProfileModifyReq();
        profileModifyReq.setNickname("변경된 닉네임");
        profileModifyReq.setIntroduce("변경된 자기소개");

        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        String content = gson.toJson(profileModifyReq);
        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", content.getBytes(StandardCharsets.UTF_8));

        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/users/profile")
                        .file(file)
                        .file(dto)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
                        .with(request -> {
                            request.setMethod("PATCH");
                            return request;
                        })
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PROFILE_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PROFILE_MODIFIED.getMessage()))
                .andDo(MockMvcRestDocumentationWrapper.document(
                        "프로필 수정 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("프로필 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.nickname").type(JsonFieldType.STRING)
                                                        .description("수정된 닉네임"),
                                                fieldWithPath("body.introduce").type(JsonFieldType.STRING)
                                                        .description("수정된 한줄소개"),
                                                fieldWithPath("body.profileUrl").type(JsonFieldType.STRING)
                                                        .description("수정된 프로필 사진")
                                        )
                                )
                                .requestSchema(Schema.schema("프로필 수정 Request"))
                                .responseSchema(Schema.schema("프로필 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 테마_변경_성공() throws Exception {
        //given
        ThemeModifyReq themeModifyReq = new ThemeModifyReq();
        themeModifyReq.setTheme("NC");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(themeModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                patch("/users/profile/theme")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(THEME_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(THEME_MODIFIED.getMessage()))
                .andDo(document(
                        "테마 변경 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("테마 변경 성공 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("theme").type(JsonFieldType.STRING)
                                                .description("변경할 테마 이름")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("테마 변경 Request"))
                                .responseSchema(Schema.schema("테마 변경 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 푸시_알림_변경_성공() throws Exception {
        //given
        AlertModifyReq alertModifyReq = new AlertModifyReq();
        alertModifyReq.setAlert(false);

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(alertModifyReq);

        //when
        ResultActions actions = mockMvc.perform(
                patch("/users/profile/alert")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ALERT_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ALERT_MODIFIED.getMessage()))
                .andDo(document(
                        "푸시 알림 변경 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("푸시 알림 변경 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("alert").type(JsonFieldType.BOOLEAN)
                                                .description("변경 값")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("푸시 알림 변경 Request"))
                                .responseSchema(Schema.schema("푸시 알림 변경 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 회원_탈퇴_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                patch("/users/resign")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(USER_RESIGNED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(USER_RESIGNED.getMessage()))
                .andDo(document(
                        "회원 탈퇴 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("회원 탈퇴 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .responseSchema(Schema.schema("회원 탈퇴 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 로컬_로그인_성공() throws Exception{
        //given
        LocalSigninReq content = LocalSigninReq.builder()
                .email("test@test.com")
                .password("password")
                .build();

        //when
        ResultActions actions = mockMvc.perform(
                post("/users/signin/local")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(content))
                        .with(csrf())
        );

        //then
        actions
                .andExpect(jsonPath("$.header.httpStatusCode").value(USER_SIGNIN_SUCCESS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(USER_SIGNIN_SUCCESS.getMessage()))
                .andDo(document(
                        "로컬 로그인 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("User API")
                                .summary("로컬 로그인 API")
                                .requestFields(
                                        fieldWithPath("email").type(JsonFieldType.STRING)
                                                .description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING)
                                                .description("비밀번호")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("accessToken").type(JsonFieldType.STRING)
                                                        .description("엑세스 토큰")
                                        )
                                )
                                .requestSchema(Schema.schema("로컬 로그인 Request"))
                                .responseSchema(Schema.schema("로컬 로그인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 회원가입_성공() throws Exception{
        //given
        List players = new ArrayList();
        players.add(1);
        players.add(2);
        players.add(3);
        SignupReq content = SignupReq.builder()
                .email("test@test.com")
                .nickname("테스트 계정")
                .introduce("ㅎㅇㅎㅇㅎㅇ")
                .profileUrl("test")
                .password("암호화 된 비밀번호")
                .team("MONSTERS")
                .providerType("LOCAL")
                .players(players)
                .build();

        //when
        ResultActions actions = mockMvc.perform(
                post("/users/signup/local")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(content))
                        .with(csrf())
        );

        //then
        actions
//                .andExpect(status().isNoContent())
                .andExpect(jsonPath("$.header.httpStatusCode").value(USER_SIGNUP_SUCCESS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(USER_SIGNUP_SUCCESS.getMessage()))
                .andDo(document(
                                "로컬 회원가입 성공",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                resource(ResourceSnippetParameters.builder()
                                                .tag("User API")
                                                .summary("로컬 회원가입 API")
                                                .requestFields(
                                                        fieldWithPath("email").type(JsonFieldType.STRING)
                                                                .description("이메일"),
                                                        fieldWithPath("password").type(JsonFieldType.STRING)
                                                                .description("비밀번호"),
                                                        fieldWithPath("providerType").type(JsonFieldType.STRING)
                                                                .description("제공자"),
                                                        fieldWithPath("profileUrl").type(JsonFieldType.STRING)
                                                                .description("프로필 url"),
                                                        fieldWithPath("nickname").type(JsonFieldType.STRING)
                                                                .description("닉네임"),
                                                        fieldWithPath("introduce").type(JsonFieldType.STRING)
                                                                .description("한줄 소개"),
                                                        fieldWithPath("team").type(JsonFieldType.STRING)
                                                                .description("최애 팀"),
                                                        fieldWithPath("players").type(JsonFieldType.ARRAY)
                                                                .description("죄애 선수(0~3)")
                                                )
//                                .responseFields(
//                                        getCommonResponseFields(
//                                                fieldWithPath("accessToken").type(JsonFieldType.STRING)
//                                                        .description("엑세스 토큰")
//                                        )
//                                )
                                                .requestSchema(Schema.schema("로컬 회원가입 Request"))
                                                .responseSchema(Schema.schema("로컬 회원가입 Response"))
                                                .build()
                                ))
                );
    }
}
