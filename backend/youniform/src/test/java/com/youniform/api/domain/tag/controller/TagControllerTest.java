package com.youniform.api.domain.tag.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.google.gson.Gson;
import com.youniform.api.domain.tag.dto.TagDto;
import com.youniform.api.domain.tag.dto.TagListRes;
import com.youniform.api.domain.tag.service.TagService;
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
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.SuccessCode.TAG_LIST_OK;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("Tag API 명세서")
@WithMockUser
public class TagControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private TagService tagService;
    
    @Test
    public void 태그_검색_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        List<TagDto> tagDtoList = new ArrayList<>();
        tagDtoList.add(TagDto.builder()
                .tagId(1L)
                .contents("태그1")
                .build());

        when(tagService.findTags(any()))
                .thenReturn(new TagListRes(tagDtoList));
        //when
        ResultActions actions = mockMvc.perform(
                get("/tags")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("name", "기아")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(TAG_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(TAG_LIST_OK.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "Tag 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Tag API")
                                .summary("Tag 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                    parameterWithName("name").description("태그 이름")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.tags[].tagId").type(JsonFieldType.NUMBER)
                                                        .description("태그 Id"),
                                                fieldWithPath("body.tags[].contents").type(JsonFieldType.STRING)
                                                        .description("태그 이름")
                                        )
                                )
                                .responseSchema(Schema.schema("Tag 조회 Response"))
                                .build()
                        ))
                );
    }
}
