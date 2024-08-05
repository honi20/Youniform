package com.youniform.api.domain.tag.controller;

import com.youniform.api.domain.tag.dto.TagDto;
import com.youniform.api.domain.tag.dto.TagListReq;
import com.youniform.api.domain.tag.dto.TagListRes;
import com.youniform.api.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static com.youniform.api.global.statuscode.SuccessCode.TAG_LIST_OK;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
@Validated
public class TagController {
    @GetMapping
    public ResponseEntity<?> tagList(
            @ModelAttribute TagListReq tagListReq) {
        List<TagDto> tagList = new ArrayList<>();
        tagList.add(TagDto.builder()
                .tagId(1L)
                .contents("기아")
                .build());
        tagList.add(TagDto.builder()
                .tagId(2L)
                .contents("기아는짱")
                .build());
        tagList.add(TagDto.builder()
                .tagId(3L)
                .contents("기아의자랑")
                .build());
        tagList.add(TagDto.builder()
                .tagId(4L)
                .contents("기아의자랑은김도영")
                .build());
        tagList.add(TagDto.builder()
                .tagId(5L)
                .contents("기아의자랑김도영짱짱")
                .build());
        tagList.add(TagDto.builder()
                .tagId(6L)
                .contents("기아최고")
                .build());

        TagListRes result = TagListRes.builder()
                .tags(tagList)
                .build();

        return new ResponseEntity<>(ResponseDto.success(TAG_LIST_OK, result), HttpStatus.OK);
    }
}
