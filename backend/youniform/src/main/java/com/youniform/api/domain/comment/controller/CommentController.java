package com.youniform.api.domain.comment.controller;

import com.youniform.api.domain.comment.dto.CommentAddReq;
import com.youniform.api.domain.comment.dto.CommentAddRes;
import com.youniform.api.domain.comment.dto.CommentModifyReq;
import com.youniform.api.domain.comment.dto.CommentModifyRes;
import com.youniform.api.domain.comment.service.CommentService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.statuscode.SuccessCode;
import jakarta.validation.Valid;
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
    private final CommentService commentService;

    @PostMapping("/{postId}")
    public ResponseEntity<?> commentAdd(@PathVariable Long postId, @RequestBody @Valid CommentAddReq commentAddReq) {
        Long userId = 123L;

        CommentAddRes result = commentService.addComment(postId, userId, commentAddReq);

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
