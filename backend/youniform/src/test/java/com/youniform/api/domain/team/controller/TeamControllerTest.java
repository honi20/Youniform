package com.youniform.api.domain.team.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.team.dto.TeamDetailsRes;
import com.youniform.api.domain.team.dto.TeamSongDto;
import com.youniform.api.domain.team.dto.TeamSongListRes;
import com.youniform.api.domain.team.service.TeamService;
import com.youniform.api.global.jwt.service.JwtService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.SuccessCode.TEAM_DETAILS_OK;
import static com.youniform.api.global.statuscode.SuccessCode.TEAM_SONG_LIST_OK;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("구단 API 명세서")
@WithMockUser
class TeamControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private TeamService teamService;

    private String jwtToken;

    @BeforeEach
    public void setup() throws JsonProcessingException {
        jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLZ";

        when(jwtService.createAccessToken(UUID)).thenReturn(jwtToken);
        when(jwtService.getAuthentication(jwtToken)).thenReturn(
                new UsernamePasswordAuthenticationToken(123L, null, List.of())
        );

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(123L, null, List.of())
        );
    }

    @Test
    public void 최애_구단_응원가_리스트_조회_성공() throws Exception {
        List<TeamSongDto> teamSongList = new ArrayList<>();
        teamSongList.add(new TeamSongDto(1L, "song1", "lyrics1", "OFFICIAL", "link1"));
        teamSongList.add(new TeamSongDto(2L, "song2", "lyrics2", "OFFICIAL", "link2"));

        when(teamService.findTeamSongs(anyLong())).thenReturn(new TeamSongListRes(teamSongList));

        ResultActions actions = mockMvc.perform(
                get("/api/teams/song")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(TEAM_SONG_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(TEAM_SONG_LIST_OK.getMessage()))
                .andDo(document(
                        "최애 구단 응원가 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Team API")
                                .summary("최애 구단 응원가 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.teamSongList[]").description("최애 구단 응원가 리스트"),
                                                fieldWithPath("body.*[].teamSongId").type(JsonFieldType.NUMBER).description("응원가 ID"),
                                                fieldWithPath("body.*[].title").type(JsonFieldType.STRING).description("응원가 제목"),
                                                fieldWithPath("body.*[].lyrics").type(JsonFieldType.STRING).description("응원가 가사"),
                                                fieldWithPath("body.*[].type").type(JsonFieldType.STRING).description("응원가 타입 (OFFICIAL, INFORMALITY)"),
                                                fieldWithPath("body.*[].link").type(JsonFieldType.STRING).description("응원가 Youtube 링크")
                                        )
                                )
                                .responseSchema(Schema.schema("최애 구단 응원가 리스트 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 최애_구단_정보_조회_성공() throws Exception {
        TeamDetailsRes response = new TeamDetailsRes("최강 몬스터즈", "서울특별시", "고척 스카이돔", LocalDate.parse("2000-01-01"), 1, 11, 0.999F, 10, "imgUrl", "photoCardUrl","mainImageUrl");
        when(teamService.findTeamDetail(anyLong())).thenReturn(response);

        ResultActions actions = mockMvc.perform(
                get("/api/teams/favorite")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(TEAM_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(TEAM_DETAILS_OK.getMessage()))
                .andDo(document(
                        "최애 구단 정보 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Team API")
                                .summary("최애 구단 정보 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.name").description("구단명").type(JsonFieldType.STRING),
                                                fieldWithPath("body.hometown").description("연고지").type(JsonFieldType.STRING),
                                                fieldWithPath("body.homeGround").description("홈구장").type(JsonFieldType.STRING),
                                                fieldWithPath("body.foundation").description("창단날").type(JsonFieldType.STRING),
                                                fieldWithPath("body.rank").description("순위").type(JsonFieldType.NUMBER),
                                                fieldWithPath("body.matchCount").description("경기 횟수").type(JsonFieldType.NUMBER),
                                                fieldWithPath("body.winningRate").description("승률").type(JsonFieldType.NUMBER),
                                                fieldWithPath("body.win").description("승 횟수").type(JsonFieldType.NUMBER),
                                                fieldWithPath("body.imgUrl").description("이미지(얼굴만) url").type(JsonFieldType.STRING),
                                                fieldWithPath("body.photoCardUrl").description("포토카드에 쓸 커버 url").type(JsonFieldType.STRING),
                                                fieldWithPath("body.mainUrl").description("메인 화면에 들어가는 캐릭터 url").type(JsonFieldType.STRING)
                                        )
                                )
                                .responseSchema(Schema.schema("최애 구단 정보 조회 Response"))
                                .build()
                        )));
    }
}