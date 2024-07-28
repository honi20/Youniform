package com.youniform.api.domain.comment.controller;

import com.youniform.api.domain.comment.dto.*;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.statuscode.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {
    @PostMapping("/{postId}")
    public ResponseEntity<?> commentAdd(@PathVariable Long postId, @RequestBody CommentAddReq commentAddReq) {
        CommentAddRes result = CommentAddRes.builder()
                .contents("도영이 귀여워")
                .createdAt("1초 전")
                .build();

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.COMMENT_CREATED, result), HttpStatus.CREATED);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> commentList(@PathVariable Long postId) {
        List<CommentListDto> commentList = new ArrayList<>();

        for (int i = 1; i < 11; i++) {
            if (i % 2 == 0) {
                commentList.add(CommentListDto.builder()
                        .commentId((long) i)
                        .contents("댓글 예시 " + i)
                        .nickname("회원 " + i)
                        .imgUrl("이미지 url")
                        .createAt(i + "시간 전")
                        .updateAt(i + "초 전")
                        .build());
            } else {
                commentList.add(CommentListDto.builder()
                        .commentId((long) i)
                        .contents("댓글 예시 " + i)
                        .nickname("회원 " + i)
                        .imgUrl("이미지 url")
                        .createAt(i + "분 전")
                        .updateAt("")
                        .build());
            }
        }

        CommentListRes result = CommentListRes.builder()
                .commentList(commentList)
                .build();

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.COMMENT_LIST_OK, result), HttpStatus.OK);
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
        return new ResponseEntity<>(ResponseDto.success(SuccessCode.COMMENT_DELETED, null), HttpStatus.NO_CONTENT);
    }
}
