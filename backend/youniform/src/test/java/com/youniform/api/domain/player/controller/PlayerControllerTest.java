package com.youniform.api.domain.player.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.player.dto.*;
import com.youniform.api.domain.player.entity.SongType;
import com.youniform.api.domain.player.service.PlayerService;
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

import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.SuccessCode.*;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("선수 API 명세서")
@WithMockUser
class PlayerControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private PlayerService playerService;

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
    public void 선수_리스트_조회_성공() throws Exception {
        List<PlayerListDto> playerList = new ArrayList<>();
        playerList.add(new PlayerListDto(1L, "김문호", 24, "외야수"));
        playerList.add(new PlayerListDto(2L, "정근우", 8, "2루수"));

        when(playerService.findPlayers(1L)).thenReturn(new PlayerListRes(playerList));

        ResultActions actions = mockMvc.perform(
                get("/players/{teamId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PLAYER_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PLAYER_LIST_OK.getMessage()))
                .andDo(document(
                        "선수 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Player API")
                                .summary("선수 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.playerList[]").description("선수 리스트"),
                                                fieldWithPath("body.*[].playerId").type(JsonFieldType.NUMBER).description("선수 ID"),
                                                fieldWithPath("body.*[].name").type(JsonFieldType.STRING).description("선수 이름"),
                                                fieldWithPath("body.*[].backNum").type(JsonFieldType.NUMBER).description("선수 등번호"),
                                                fieldWithPath("body.*[].position").type(JsonFieldType.STRING).description("선수 포지션")
                                        )
                                )
                                .responseSchema(Schema.schema("선수 리스트 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 최애_선수_정보_조회_성공() throws Exception {
        List<PlayerDetailDto> playerList = new ArrayList<>();
        playerList.add(new PlayerDetailDto(1L, "박용택", LocalDate.parse("1979-04-21"), 33, 0.0F, 0, 0, 0, null, null, null, null, "외야수", "우투좌타"));

        when(playerService.findFavoritePlayers(anyLong())).thenReturn(new FavoritePlayerListRes(playerList));

        ResultActions actions = mockMvc.perform(
                get("/players/favorite")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FAVORITE_PLAYER_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FAVORITE_PLAYER_LIST_OK.getMessage()))
                .andDo(document(
                        "최애 선수 정보 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Player API")
                                .summary("최애 선수 정보 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.playerList[]").description("선수 리스트"),
                                                fieldWithPath("body.*[].playerId").type(JsonFieldType.NUMBER).description("선수 ID"),
                                                fieldWithPath("body.*[].name").type(JsonFieldType.STRING).description("선수 이름"),
                                                fieldWithPath("body.*[].age").type(JsonFieldType.STRING).description("선수 생년월일"),
                                                fieldWithPath("body.*[].backNum").type(JsonFieldType.NUMBER).description("선수 등번호"),
                                                fieldWithPath("body.*[].battingAverage").type(JsonFieldType.NUMBER).description("선수 타율 (타자)").optional(),
                                                fieldWithPath("body.*[].hit").type(JsonFieldType.NUMBER).description("선수 안타 (타자)").optional(),
                                                fieldWithPath("body.*[].homerun").type(JsonFieldType.NUMBER).description("선수 홈런 (타자)").optional(),
                                                fieldWithPath("body.*[].steal").type(JsonFieldType.NUMBER).description("선수 도루 (타자)").optional(),
                                                fieldWithPath("body.*[].era").type(JsonFieldType.NUMBER).description("선수 ERA (투수)").optional(),
                                                fieldWithPath("body.*[].whip").type(JsonFieldType.NUMBER).description("선수 WHIP (투수)").optional(),
                                                fieldWithPath("body.*[].win").type(JsonFieldType.NUMBER).description("선수 승수 (투수)").optional(),
                                                fieldWithPath("body.*[].struck").type(JsonFieldType.NUMBER).description("선수 삼진 (투수)").optional(),
                                                fieldWithPath("body.*[].position").type(JsonFieldType.STRING).description("선수 포지션"),
                                                fieldWithPath("body.*[].twoWay").type(JsonFieldType.STRING).description("선수 투타")
                                        )
                                )
                                .responseSchema(Schema.schema("최애 선수 정보 리스트 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 최애_선수_응원가_조회_성공() throws Exception {
        List<PlayerSongDto> songList = new ArrayList<>();
        songList.add(new PlayerSongDto(1L, "title", "lyrics", SongType.CHEERING, "link"));

        when(playerService.findPlayerSongs(4L)).thenReturn(new PlayerSongListRes(songList));

        ResultActions actions = mockMvc.perform(
                get("/players/song/{playerId}", 4L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PLAYER_SONG_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PLAYER_SONG_LIST_OK.getMessage()))
                .andDo(document(
                        "선수 응원가 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Player API")
                                .summary("선수 응원가 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.songList[]").description("응원가 리스트"),
                                                fieldWithPath("body.*[].songId").type(JsonFieldType.NUMBER).description("응원가 ID"),
                                                fieldWithPath("body.*[].title").type(JsonFieldType.STRING).description("응원가 제목"),
                                                fieldWithPath("body.*[].lyrics").type(JsonFieldType.STRING).description("응원가 가사"),
                                                fieldWithPath("body.*[].type").type(JsonFieldType.STRING).description("응원가 타입"),
                                                fieldWithPath("body.*[].link").type(JsonFieldType.STRING).description("응원가 유튜브 링크")
                                        )
                                )
                                .responseSchema(Schema.schema("선수 응원가 리스트 조회 Response"))
                                .build()
                        )));
    }
}