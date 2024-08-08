package com.youniform.api.domain.tag.controller;

import com.youniform.api.domain.tag.dto.TagListReq;
import com.youniform.api.domain.tag.dto.TagListRes;
import com.youniform.api.domain.tag.service.TagService;
import com.youniform.api.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.youniform.api.global.statuscode.SuccessCode.TAG_LIST_OK;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
@Validated
public class TagController {
    private final TagService tagService;

    @GetMapping
    public ResponseEntity<?> tagList(
            @ModelAttribute TagListReq tagListReq) {
        TagListRes result = tagService.findTags(tagListReq);

        return new ResponseEntity<>(ResponseDto.success(TAG_LIST_OK, result), HttpStatus.OK);
    }
}
