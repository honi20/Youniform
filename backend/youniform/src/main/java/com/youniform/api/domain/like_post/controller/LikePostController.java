package com.youniform.api.domain.like_post.controller;

import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.statuscode.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
@Validated
public class LikePostController {
    @PostMapping("/{postId}")
    public ResponseEntity<?> postLike(@PathVariable Long postId) {
        return new ResponseEntity<>(ResponseDto.success(SuccessCode.LIKES_CREATED, null), HttpStatus.CREATED);
    }
}
