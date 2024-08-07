package com.youniform.api.domain.comment.controller;

import com.youniform.api.domain.comment.dto.CommentAddReq;
import com.youniform.api.domain.comment.dto.CommentAddRes;
import com.youniform.api.domain.comment.dto.CommentModifyReq;
import com.youniform.api.domain.comment.dto.CommentModifyRes;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.statuscode.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {
    @PostMapping("/{postId}")
    public ResponseEntity<?> commentAdd(@PathVariable Long postId, @RequestBody CommentAddReq commentAddReq) {
        CommentAddRes result = CommentAddRes.builder()
                .commentId(1L)
                .nickname("회원 닉네임")
                .imgUrl("s3 url")
                .userId("uuid")
                .contents("도영이 귀여워")
                .createdAt("1초 전")
                .build();

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.COMMENT_CREATED, result), HttpStatus.CREATED);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<?> commentModify(@PathVariable Long commentId, @RequestBody CommentModifyReq commentModifyReq) {
        CommentModifyRes result = CommentModifyRes.builder()
                .contents("댓글 수정예시 11111")
                .updateAt("20초 전")
                .build();

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.COMMENT_MODIFIED, result), HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> commentDelete(@PathVariable Long commentId) {
        return new ResponseEntity<>(ResponseDto.success(SuccessCode.COMMENT_DELETED, null), HttpStatus.OK);
    }
}
