package com.youniform.api.domain.like_post.controller;

import com.youniform.api.domain.like_post.dto.PostLikeReq;
import com.youniform.api.domain.like_post.service.LikePostService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.global.statuscode.SuccessCode.LIKES_STATUS_OK;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
@Validated
public class LikePostController {
    private final LikePostService postLikeService;
    private final JwtService jwtService;

    @PostMapping("/{postId}")
    public ResponseEntity<?> postLike(@PathVariable Long postId,
                                      @RequestBody PostLikeReq postLikeReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        postLikeService.likePost(userId, postId, postLikeReq);
        return new ResponseEntity<>(ResponseDto.success(LIKES_STATUS_OK, null), HttpStatus.OK);
    }
}
