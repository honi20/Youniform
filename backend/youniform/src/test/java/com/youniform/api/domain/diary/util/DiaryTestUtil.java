package com.youniform.api.domain.diary.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.domain.diary.dto.resource.StampDto;
import com.youniform.api.domain.diary.entity.Scope;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

public class DiaryTestUtil {
    public static String getImageJson() {
        return """
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
    }

    public static String getTextboxJson() {
        return """
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
    }

    public static DiaryContentDto getDiaryContent() throws JsonProcessingException {
        List<DiaryContentObjectDto> objects = new ArrayList<>();

        ObjectMapper mapper = new ObjectMapper();
        DiaryContentObjectDto imageObj = mapper.readValue(getImageJson(), DiaryImageObjectDto.class);
        objects.add(imageObj);
        DiaryContentObjectDto textboxObj = mapper.readValue(getTextboxJson(), DiaryTextboxObjectDto.class);
        objects.add(textboxObj);

        DiaryContentDto diaryContentDto = new DiaryContentDto();
        diaryContentDto.setVersion("6.0.2");
        diaryContentDto.setObjects(objects);
        diaryContentDto.setBackground("white");
        diaryContentDto.setBackgroundImage((DiaryImageObjectDto) imageObj);

        return diaryContentDto;
    }

    public static DiaryContentDto getDiaryContentDto(boolean isValid) throws JsonProcessingException {
        List<DiaryContentObjectDto> objects = new ArrayList<>();

        ObjectMapper mapper = new ObjectMapper();
        DiaryContentObjectDto imageObj = mapper.readValue(getImageJson(), DiaryImageObjectDto.class);
        objects.add(imageObj);
        DiaryContentObjectDto textboxObj = mapper.readValue(getTextboxJson(), DiaryTextboxObjectDto.class);
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

    public static List<FieldDescriptor> getDiaryListFields(String prefix) {
        List<FieldDescriptor> fields = new ArrayList<>();

        fields.add(fieldWithPath("body.diaryList.content").type(JsonFieldType.ARRAY).description("게시글 목록"));
        fields.add(fieldWithPath("body.diaryList.page").type(JsonFieldType.NUMBER).description("슬라이스 번호"));
        fields.add(fieldWithPath("body.diaryList.size").type(JsonFieldType.NUMBER).description("슬라이스 사이즈"));
        fields.add(fieldWithPath("body.diaryList.hasNext").type(JsonFieldType.BOOLEAN).description("다음 슬라이스 여부"));
        fields.add(fieldWithPath("body.diaryList.*[].diaryId").type(JsonFieldType.NUMBER).description("다이어리 ID"));
        fields.add(fieldWithPath("body.diaryList.*[].nickname").type(JsonFieldType.STRING).description("작성자 닉네임"));
        fields.add(fieldWithPath("body.diaryList.*[].diaryDate").type(JsonFieldType.STRING).description("일기 날짜"));
        fields.add(fieldWithPath("body.diaryList.*[].scope").type(JsonFieldType.STRING).description("다이어리 공개 범위"));
        fields.add(fieldWithPath("body.diaryList.*[].stampImgUrl").type(JsonFieldType.STRING).description("다이어리 스탬프 이미지 URL"));
        fields.add(fieldWithPath("body.diaryList.*[].profileUrl").type(JsonFieldType.STRING).description("작성자 프로필 URL"));
        fields.add(fieldWithPath("body.diaryList.*[].diaryImgUrl").type(JsonFieldType.STRING).description("다이어리 이미지 URL"));

        return fields;
    }

    public static List<FieldDescriptor> getDiaryFields(String prefix) {
        List<FieldDescriptor> fields = new ArrayList<>();

        if (prefix.equals("")) {
            fields.add(fieldWithPath(prefix + "stampId").type(JsonFieldType.NUMBER)
                    .description("다이어리 스탬프 Id"));
        } else {
            fields.add(fieldWithPath(prefix + "diaryId").type(JsonFieldType.NUMBER)
                    .description("다이어리 Id"));
            fields.add(fieldWithPath(prefix + "nickname").type(JsonFieldType.STRING)
                    .description("작성자 닉네임"));
            fields.add(fieldWithPath(prefix + "stampId").type(JsonFieldType.NUMBER)
                    .description("다이어리 스탬프 Id"));
            fields.add(fieldWithPath(prefix + "stampImgUrl").type(JsonFieldType.STRING)
                    .description("다이어리 스탬프 이미지 url"));
            fields.add(fieldWithPath(prefix + "profileUrl").type(JsonFieldType.STRING)
                    .description("작성자 프로필 이미지 url"));
        }
        fields.add(fieldWithPath(prefix + "diaryDate").type(JsonFieldType.STRING)
                .description("일기 날짜"));
        fields.add(fieldWithPath(prefix + "contents.version").type(JsonFieldType.STRING)
                .description("버전"));
        fields.add(fieldWithPath(prefix + "contents.objects").type(JsonFieldType.ARRAY)
                .description("다이어리 내용 객체 배열"));
        fields.add(fieldWithPath(prefix + "contents.background").type(JsonFieldType.STRING)
                .description("배경"));
        fields.add(fieldWithPath(prefix + "contents.backgroundImage").type(JsonFieldType.OBJECT)
                .description("배경 객체"));
        fields.add(fieldWithPath(prefix + "scope").type(JsonFieldType.STRING)
                .description("공개 범위"));
        fields.add(fieldWithPath(prefix + "diaryImgUrl").type(JsonFieldType.STRING)
                .description("다이어리 이미지 Url"));

        fields.addAll(getObjectFields(prefix + "contents.objects[]"));
        fields.addAll(getObjectFields(prefix + "contents.backgroundImage"));

        return fields;
    }

    public static List<FieldDescriptor> getObjectFields(String prefix) {
        return List.of(
                // 공통 필드
                fieldWithPath(prefix + ".type").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".version").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".originX").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".originY").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".left").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".top").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".width").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".height").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".fill").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".stroke").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".strokeWidth").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".strokeDashArray").type(JsonFieldType.OBJECT).ignored().optional(),
                fieldWithPath(prefix + ".strokeLineCap").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".strokeDashOffset").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".strokeLineJoin").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".strokeUniform").type(JsonFieldType.BOOLEAN).ignored().optional(),
                fieldWithPath(prefix + ".strokeMiterLimit").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".scaleX").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".scaleY").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".angle").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".flipX").type(JsonFieldType.BOOLEAN).ignored().optional(),
                fieldWithPath(prefix + ".flipY").type(JsonFieldType.BOOLEAN).ignored().optional(),
                fieldWithPath(prefix + ".opacity").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".shadow").type(JsonFieldType.OBJECT).ignored().optional(),
                fieldWithPath(prefix + ".visible").type(JsonFieldType.BOOLEAN).ignored().optional(),
                fieldWithPath(prefix + ".backgroundColor").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".fillRule").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".paintFirst").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".globalCompositeOperation").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".skewX").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".skewY").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".cropX").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".cropY").type(JsonFieldType.NUMBER).ignored().optional(),

                // image specific fields
                fieldWithPath(prefix + ".src").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".crossOrigin").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".filters").type(JsonFieldType.OBJECT).ignored().optional(),

                // textbox specific fields
                fieldWithPath(prefix + ".fontFamily").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".fontWeight").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".fontSize").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".text").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".underline").type(JsonFieldType.BOOLEAN).ignored().optional(),
                fieldWithPath(prefix + ".overline").type(JsonFieldType.BOOLEAN).ignored().optional(),
                fieldWithPath(prefix + ".linethrough").type(JsonFieldType.BOOLEAN).ignored().optional(),
                fieldWithPath(prefix + ".textAlign").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".fontStyle").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".lineHeight").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".textBackgroundColor").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".charSpacing").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".styles").type(JsonFieldType.OBJECT).ignored().optional(),
                fieldWithPath(prefix + ".direction").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".path").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".pathStartOffset").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".pathSide").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".pathAlign").type(JsonFieldType.STRING).ignored().optional(),
                fieldWithPath(prefix + ".minWidth").type(JsonFieldType.NUMBER).ignored().optional(),
                fieldWithPath(prefix + ".splitByGrapheme").type(JsonFieldType.BOOLEAN).ignored().optional()
        );
    }
}
