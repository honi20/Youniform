package com.youniform.api.domain.post.controller;

import com.youniform.api.domain.post.dto.*;
import com.youniform.api.domain.post.service.PostService;
import com.youniform.api.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Validated
@Slf4j
public class PostController {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    private final PostService postService;

    @PostMapping
    public ResponseEntity<?> postAdd(
            @RequestPart(value = "dto") PostAddReq postAddReq,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {

        Long userId = 123L;

        PostAddRes result = postService.addPost(postAddReq, file, userId);

        return new ResponseEntity<>(ResponseDto.success(POST_CREATED, result), HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<?> publicPostList(
            @ModelAttribute PublicPostListReq publicPostListReq,
            @PageableDefault(size = 10) Pageable pageable) {
        Long userId = 123L;

        PostListRes result = postService.findPublicPosts(userId, publicPostListReq, pageable);

        return new ResponseEntity<>(ResponseDto.success(PUBLIC_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> myPostList(
            @ModelAttribute MyPostListReq myPostListReq,
            @PageableDefault(size = 10) Pageable pageable) {
        Long userId = 123L;

        PostListRes result = postService.findMyPosts(userId, myPostListReq, pageable);

        return new ResponseEntity<>(ResponseDto.success(MY_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/friends/{friendId}")
    public ResponseEntity<?> friendPostList(
            @ModelAttribute FriendPostListReq friendPostReq,
            @PathVariable String friendId,
            @PageableDefault(size = 10) Pageable pageable) {
        Long userId = 123L;

        PostListRes result = postService.findFriendPost(userId, friendId, friendPostReq, pageable);

        return new ResponseEntity<>(ResponseDto.success(FRIEND_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/likes")
    public ResponseEntity<?> likedPostList(
            @ModelAttribute LikedPostListReq likedPostListReq,
            @PageableDefault(size = 10) Pageable pageable) {
        Long userId = 123L;

        PostListRes result = postService.findLikedPost(123L, likedPostListReq, pageable);

        return new ResponseEntity<>(ResponseDto.success(LIKED_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/tags")
    public ResponseEntity<?> tagPostList(
            @ModelAttribute TagPostReq tagPostReq,
            @PageableDefault(size = 10) Pageable pageable) {
        Long userId = 123L;

        PostListRes result = postService.findTagPost(userId, tagPostReq, pageable);

        return new ResponseEntity<>(ResponseDto.success(TAG_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> postDetails(@PathVariable Long postId) {
        Long userId = 123L;

        PostDetailsRes result = postService.findPost(postId, userId);

        return new ResponseEntity<>(ResponseDto.success(POST_DETAILS_OK, result), HttpStatus.OK);
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<?> postModify(
            @PathVariable Long postId,
            @RequestPart(value = "dto") PostModifyReq postModifyReq,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {

        Long userId = 123L;

        PostModifyRes result = postService.modifyPost(postModifyReq, file, postId, userId);

        return new ResponseEntity<>(ResponseDto.success(POST_MODIFIED, result), HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> postDelete(@PathVariable Long postId) throws IOException {
        Long userId = 123L;

        postService.removePost(postId, userId);

        return new ResponseEntity<>(ResponseDto.success(POST_DELETED, null), HttpStatus.OK);
    }
}
