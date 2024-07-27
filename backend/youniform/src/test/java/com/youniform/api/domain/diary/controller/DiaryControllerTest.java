package com.youniform.api.domain.diary.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.diary.dto.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DiaryController.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("다이어리 API 명세서")
public class DiaryControllerTest {
	private final static String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
	private final static String imageJson = """
			{
			    "type": "image",
			    "version": "5.3.0",
			    "originX": "center",
			    "originY": "center",
			    "left": 290.02,
			    "top": 415.57,
			    "width": 312,
			    "height": 312,
			    "fill": "rgb(0,0,0)",
			    "stroke": null,
			    "strokeWidth": 0,
			    "strokeDashArray": null,
			    "strokeLineCap": "butt",
			    "strokeDashOffset": 0,
			    "strokeLineJoin": "miter",
			    "strokeUniform": false,
			    "strokeMiterLimit": 4,
			    "scaleX": 0.6,
			    "scaleY": 0.6,
			    "angle": 0,
			    "flipX": false,
			    "flipY": false,
			    "opacity": 1,
			    "shadow": null,
			    "visible": true,
			    "backgroundColor": "",
			    "fillRule": "nonzero",
			    "paintFirst": "fill",
			    "globalCompositeOperation": "source-over",
			    "skewX": 0,
			    "skewY": 0,
			    "cropX": 0,
			    "cropY": 0,
			    "src": "http://localhost:5173/src/assets/stickers/sticker3.png",
			    "crossOrigin": null,
			    "filters": []
			}
			""";
	private final static String textboxJson = """
			{
				"type": "textbox",
				"version": "5.3.0",
				"originX": "center",
				"originY": "center",
				"left": 196.19,
				"top": 194.38,
				"width": 136.95,
				"height": 33.9,
				"fill": "#000000",
				"stroke": null,
				"strokeWidth": 1,
				"strokeDashArray": null,
				"strokeLineCap": "butt",
				"strokeDashOffset": 0,
				"strokeLineJoin": "miter",
				"strokeUniform": false,
				"strokeMiterLimit": 4,
				"scaleX": 2.35,
				"scaleY": 2.35,
				"angle": 344.82,
				"flipX": false,
				"flipY": false,
				"opacity": 1,
				"shadow": null,
				"visible": true,
				"backgroundColor": "",
				"fillRule": "nonzero",
				"paintFirst": "fill",
				"globalCompositeOperation": "source-over",
				"skewX": 0,
				"skewY": 0,
				"fontFamily": "RascalMedium",
				"fontWeight": "normal",
				"fontSize": 30,
				"text": "최강기아!!!",
				"underline": false,
				"overline": false,
				"linethrough": false,
				"textAlign": "left",
				"fontStyle": "normal",
				"lineHeight": 1.16,
				"textBackgroundColor": "",
				"charSpacing": 0,
				"styles": [],
				"direction": "ltr",
				"path": null,
				"pathStartOffset": 0,
				"pathSide": "left",
				"pathAlign": "baseline",
				"minWidth": 20,
				"splitByGrapheme": false
			}
			""";
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper mapper;

	@Test
	public void 다이어리_생성_성공() throws Exception {
		// given
		DiaryAddReq diaryAddReq = getDiaryAddReq("2024-07-27", getDiaryContentDto(true), "ALL", 1L);

		// when & then
		performPost("/diaries", diaryAddReq)
				.andExpect(status().isCreated())
				.andDo(document("Diary 생성 성공",
						preprocessRequest(prettyPrint()),
						preprocessResponse(prettyPrint()),
						resource(ResourceSnippetParameters.builder()
								.tag("Diary API")
								.summary("Diary 생성 API")
								.requestHeaders(
										headerWithName("Authorization").description("JWT 토큰")
								)
								.requestFields(
										getDiaryRequestFields()
								)
								.responseFields(
										getCommonResponseFields(
												fieldWithPath("body.diaryId").type(JsonFieldType.NUMBER).description("생성된 다이어리 Id")
										)
								)
								.requestSchema(Schema.schema("Diary 생성 Request"))
								.responseSchema(Schema.schema("Diary 생성 Response"))
								.build()
						))
				);
	}

	@Test
	public void 다이어리_생성_실패_잘못된_날짜형식() throws Exception {
		// given
		DiaryAddReq diaryAddReq = getDiaryAddReq("2024", getDiaryContentDto(true), "ALL", 1L);

		// when & then
		performPost("/diaries", diaryAddReq)
				.andExpect(status().isBadRequest())
				.andDo(document(
						"Diary 생성 실패 - 잘못된 날짜 형식 (yyyy-mm-dd 형식이 아닌 경우)",
						preprocessRequest(prettyPrint()),
						preprocessResponse(prettyPrint()),
						resource(ResourceSnippetParameters.builder()
								.tag("Diary API")
								.summary("Diary 생성 API")
								.requestHeaders(
										headerWithName("Authorization").description("JWT 토큰")
								)
								.responseFields(
										getCommonResponseFields(
												fieldWithPath("body").type(JsonFieldType.OBJECT).description("에러 상세").optional()
										)
								)
								.build()
						))
				);
	}

	@Test
	public void 다이어리_생성_실패_잘못된_컨텐츠형식() throws Exception {
		// given
		DiaryAddReq diaryAddReq = getDiaryAddReq("2024-07-24", getDiaryContentDto(false), "PUBLIC", 1L);

		// when & then
		performPost("/diaries", diaryAddReq)
				.andExpect(status().isBadRequest())
				.andDo(document(
						"Diary 생성 실패 - 잘못된 컨텐츠 형식 (version, objects, background, backgroundImage)",
						preprocessRequest(prettyPrint()),
						preprocessResponse(prettyPrint()),
						resource(ResourceSnippetParameters.builder()
								.tag("Diary API")
								.summary("Diary 생성 API")
								.requestHeaders(
										headerWithName("Authorization").description("JWT 토큰")
								)
								.responseFields(
										getCommonResponseFields(
												fieldWithPath("body").type(JsonFieldType.OBJECT).description("에러 상세").optional()
										)
								)
								.build()
						))
				);
	}

	@Test
	public void 다이어리_생성_실패_잘못된_공개범위() throws Exception {
		// given
		DiaryAddReq diaryAddReq = getDiaryAddReq("2024-07-24", getDiaryContentDto(true), "ONLY_ME", 1L);

		// when & then
		performPost("/diaries", diaryAddReq)
				.andExpect(status().isBadRequest())
				.andDo(document(
						"Diary 생성 실패 - 잘못된 공개범위 (ALL, FRIENDS, PRIVATE 중 하나가 아닌 경우)",
						preprocessRequest(prettyPrint()),
						preprocessResponse(prettyPrint()),
						resource(ResourceSnippetParameters.builder()
								.tag("Diary API")
								.summary("Diary 생성 API")
								.requestHeaders(
										headerWithName("Authorization").description("JWT 토큰")
								)
								.responseFields(
										getCommonResponseFields(
												fieldWithPath("body").type(JsonFieldType.OBJECT).description("에러 상세").optional()
										)
								)
								.build()
						))
				);
	}

	@Test
	public void 다이어리_생성_실패_존재하지_않은_스탬프() throws Exception {
		// given
		DiaryAddReq diaryAddReq = getDiaryAddReq("2024-07-24", getDiaryContentDto(true), "ALL", -1L);

		// when & then
		performPost("/diaries", diaryAddReq)
				.andExpect(status().isNotFound())
				.andDo(document(
						"Diary 생성 실패 - 존재하지 않은 스탬프 (Stamp ID가 유효하지 않음)",
						preprocessRequest(prettyPrint()),
						preprocessResponse(prettyPrint()),
						resource(ResourceSnippetParameters.builder()
								.tag("Diary API")
								.summary("Diary 생성 API")
								.requestHeaders(
										headerWithName("Authorization").description("JWT 토큰")
								)
								.responseFields(
										getCommonResponseFields(
												fieldWithPath("body").type(JsonFieldType.OBJECT).description("에러 상세").optional()
										)
								)
								.build()
						))
				);
	}

	private ResultActions performPost(String path, DiaryAddReq diaryAddReq) throws Exception {
		String content = mapper.writeValueAsString(diaryAddReq);

		return mockMvc.perform(
				post(path)
						.header("Authorization", jwtToken)
						.accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(content)
		);
	}

	private DiaryAddReq getDiaryAddReq(String diaryDate, DiaryContentDto diaryContentDto, String scope, Long stampId) {
		return new DiaryAddReq(diaryDate, diaryContentDto, scope, stampId);
	}

	private DiaryContentDto getDiaryContentDto(boolean isValid) throws JsonProcessingException {
		List<DiaryContentObjectDto> objects = new ArrayList<>();

		DiaryContentObjectDto imageObj = mapper.readValue(imageJson, DiaryImageObjectDto.class);
		objects.add(imageObj);
		DiaryContentObjectDto textboxObj = mapper.readValue(textboxJson, DiaryTextboxObjectDto.class);
		objects.add(textboxObj);

		DiaryContentDto diaryContentDto = new DiaryContentDto();
		diaryContentDto.setVersion("6.0.2");
		diaryContentDto.setObjects(objects);
		diaryContentDto.setBackground("white");

		if (isValid) {
			diaryContentDto.setBackgroundImage((DiaryImageObjectDto) imageObj);
		} else {
			diaryContentDto.setBackgroundImage(new DiaryImageObjectDto());
		}

		return diaryContentDto;
	}

	private List<FieldDescriptor> getDiaryRequestFields() {
		List<FieldDescriptor> requestFields = new ArrayList<>();

		requestFields.add(fieldWithPath("diaryDate").type(JsonFieldType.STRING)
				.description("일기 날짜"));
		requestFields.add(fieldWithPath("contents.version").type(JsonFieldType.STRING)
				.description("버전"));
		requestFields.add(fieldWithPath("contents.objects").type(JsonFieldType.ARRAY)
				.description("다이어리 내용 객체 배열"));
		requestFields.add(fieldWithPath("scope").type(JsonFieldType.STRING)
				.description("공개 범위"));
		requestFields.add(fieldWithPath("stampId").type(JsonFieldType.NUMBER)
				.description("다이어리 스탬프 Id"));
		requestFields.addAll(getObjectFields());

		return requestFields;
	}

	private List<FieldDescriptor> getCommonResponseFields(FieldDescriptor... additionalFields) {
		List<FieldDescriptor> responseFields = new ArrayList<>();

		responseFields.add(fieldWithPath("header.httpStatusCode").type(JsonFieldType.NUMBER).description("응답 코드"));
		responseFields.add(fieldWithPath("header.message").type(JsonFieldType.STRING).description("응답 메시지"));

		if (additionalFields != null && additionalFields.length > 0) {
			responseFields.addAll(List.of(additionalFields));
		}
		return responseFields;
	}

	private List<FieldDescriptor> getObjectFields() {
		return List.of(
				// 공통 필드
				fieldWithPath("contents.objects[].type").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].version").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].originX").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].originY").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].left").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].top").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].width").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].height").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].fill").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].stroke").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].strokeWidth").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].strokeDashArray").type(JsonFieldType.OBJECT).ignored().optional(),
				fieldWithPath("contents.objects[].strokeLineCap").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].strokeDashOffset").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].strokeLineJoin").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].strokeUniform").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.objects[].strokeMiterLimit").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].scaleX").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].scaleY").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].angle").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].flipX").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.objects[].flipY").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.objects[].opacity").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].shadow").type(JsonFieldType.OBJECT).ignored().optional(),
				fieldWithPath("contents.objects[].visible").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.objects[].backgroundColor").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].fillRule").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].paintFirst").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].globalCompositeOperation").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].skewX").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].skewY").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].cropX").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].cropY").type(JsonFieldType.NUMBER).ignored().optional(),

				// image specific fields
				fieldWithPath("contents.objects[].src").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].crossOrigin").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].filters").type(JsonFieldType.OBJECT).ignored().optional(),

				// textbox specific fields
				fieldWithPath("contents.objects[].fontFamily").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].fontWeight").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].fontSize").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].text").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].underline").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.objects[].overline").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.objects[].linethrough").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.objects[].textAlign").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].fontStyle").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].lineHeight").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].textBackgroundColor").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].charSpacing").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].styles").type(JsonFieldType.OBJECT).ignored().optional(),
				fieldWithPath("contents.objects[].direction").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].path").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].pathStartOffset").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].pathSide").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].pathAlign").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.objects[].minWidth").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.objects[].splitByGrapheme").type(JsonFieldType.BOOLEAN).ignored().optional(),

				fieldWithPath("contents.background").type(JsonFieldType.STRING).description("배경"),
				fieldWithPath("contents.backgroundImage").type(JsonFieldType.OBJECT).description("배경 객체"),
				fieldWithPath("contents.backgroundImage.type").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.version").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.originX").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.originY").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.left").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.top").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.width").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.height").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.fill").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.stroke").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.strokeWidth").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.strokeDashArray").type(JsonFieldType.ARRAY).ignored().optional(),
				fieldWithPath("contents.backgroundImage.strokeLineCap").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.strokeDashOffset").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.strokeLineJoin").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.strokeUniform").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.backgroundImage.strokeMiterLimit").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.scaleX").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.scaleY").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.angle").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.flipX").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.backgroundImage.flipY").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.backgroundImage.opacity").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.shadow").type(JsonFieldType.OBJECT).ignored().optional(),
				fieldWithPath("contents.backgroundImage.visible").type(JsonFieldType.BOOLEAN).ignored().optional(),
				fieldWithPath("contents.backgroundImage.backgroundColor").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.fillRule").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.paintFirst").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.globalCompositeOperation").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.skewX").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.skewY").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.cropX").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.cropY").type(JsonFieldType.NUMBER).ignored().optional(),
				fieldWithPath("contents.backgroundImage.src").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.crossOrigin").type(JsonFieldType.STRING).ignored().optional(),
				fieldWithPath("contents.backgroundImage.filters").type(JsonFieldType.OBJECT).ignored().optional()
		);
	}
}
