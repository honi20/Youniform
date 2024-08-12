package com.youniform.api.domain.comment.controller;

import com.youniform.api.domain.comment.dto.CommentAddReq;
import com.youniform.api.domain.comment.dto.CommentAddRes;
import com.youniform.api.domain.comment.dto.CommentModifyReq;
import com.youniform.api.domain.comment.dto.CommentModifyRes;
import com.youniform.api.domain.comment.service.CommentService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.statuscode.SuccessCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {
    private final CommentService commentService;

    private final JwtService jwtService;

    @PostMapping("/{postId}")
    public ResponseEntity<?> commentAdd(@PathVariable("postId") Long postId, @RequestBody @Valid CommentAddReq commentAddReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        CommentAddRes result = commentService.addComment(postId, userId, commentAddReq);

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.COMMENT_CREATED, result), HttpStatus.CREATED);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<?> commentModify(@PathVariable("commentId") Long commentId, @RequestBody CommentModifyReq commentModifyReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        CommentModifyRes result = commentService.modifyComment(userId, commentId, commentModifyReq);

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.COMMENT_MODIFIED, result), HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> commentDelete(@PathVariable("commentId") Long commentId) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        commentService.removeComment(userId, commentId);

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.COMMENT_DELETED, null), HttpStatus.OK);
    }
}
