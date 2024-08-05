package com.youniform.api.domain.post.controller;

import com.youniform.api.domain.post.dto.*;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.dto.SliceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Validated
public class PostController {
    @PostMapping
    public ResponseEntity<?> postAdd(
            @RequestPart(value = "dto") PostAddReq postAddReq,
            @RequestPart(value = "file") MultipartFile file) {
        List<String> tagList = new ArrayList<>();
        tagList.add("김도영");
        tagList.add("잠실");
        tagList.add("기아");
        tagList.add("도영이");

        PostAddRes result = PostAddRes.builder()
                .postId(1L)
                .contents("테스트111")
                .imageUrl("s3 url")
                .tags(tagList)
                .createdDate(LocalDate.now())
                .build();

        return new ResponseEntity<>(ResponseDto.success(POST_CREATED, result), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> publicPostList(
            @ModelAttribute PublicPostListReq publicPostListReq,
            @PageableDefault(size = 10) Pageable pageable) {
        List<PostDto> postList = new ArrayList<>();

        List<String> tagList1 = new ArrayList<>();
        tagList1.add("김도영");
        tagList1.add("잠실");
        tagList1.add("기아");
        tagList1.add("도영이");

        List<String> tagList2 = new ArrayList<>();
        tagList2.add("최강야구");
        tagList2.add("몬스터즈");
        tagList2.add("이대호");
        tagList2.add("굿");

        List<String> tagList3 = new ArrayList<>();
        tagList3.add("SSG");
        tagList3.add("랜더스");
        tagList3.add("기아");
        tagList3.add("WIN");

        for (int i = 0; i < 9; i++) {
            if (i % 3 == 0) {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("테스트 게시글 아아아아아앙")
                                .tags(tagList1)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            } else if (i % 3 == 1) {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("기아는 왜 맨날 마트한테 지는걸까;;<br>" +
                                        "어제도 지고 오늘도 지네<br>" +
                                        "이마트랑 롯데한테 지는 거 열받아ㅠ")
                                .tags(tagList2)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            } else {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("오늘 잠실 야구장 다녀옴.<br>" +
                                        "비 맞으면서 야구 봤다ㅎ,,<br>" +
                                        "하지만 졌다\uD83D\uDE02\uD83D\uDE02<br>" +
                                        "그래도 도영이는 오늘도 잘 달림!!")
                                .tags(tagList3)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            }
        }

        SliceDto<PostDto> sliceDto = new SliceDto<>();
        sliceDto.setContent(postList);
        sliceDto.setPage(pageable.getPageNumber() + 1);
        sliceDto.setSize(pageable.getPageSize());
        sliceDto.setHasNext(postList.size() > pageable.getPageSize());

        PostListRes result = PostListRes.builder()
                .postList(sliceDto)
                .build();

        return new ResponseEntity<>(ResponseDto.success(PUBLIC_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> myPostList(
            @ModelAttribute MyPostListReq myPostListReq,
            @PageableDefault(size = 10) Pageable pageable) {
        List<PostDto> postList = new ArrayList<>();

        List<String> tagList1 = new ArrayList<>();
        tagList1.add("김도영");
        tagList1.add("잠실");
        tagList1.add("기아");
        tagList1.add("도영이");

        List<String> tagList2 = new ArrayList<>();
        tagList2.add("최강야구");
        tagList2.add("몬스터즈");
        tagList2.add("이대호");
        tagList2.add("굿");

        List<String> tagList3 = new ArrayList<>();
        tagList3.add("SSG");
        tagList3.add("랜더스");
        tagList3.add("기아");
        tagList3.add("WIN");

        for (int i = 0; i < 9; i++) {
            if (i % 3 == 0) {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("테스트 게시글 아아아아아앙")
                                .tags(tagList1)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            } else if (i % 3 == 1) {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("기아는 왜 맨날 마트한테 지는걸까;;<br>" +
                                        "어제도 지고 오늘도 지네<br>" +
                                        "이마트랑 롯데한테 지는 거 열받아ㅠ")
                                .tags(tagList2)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            } else {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("오늘 잠실 야구장 다녀옴.<br>" +
                                        "비 맞으면서 야구 봤다ㅎ,,<br>" +
                                        "하지만 졌다\uD83D\uDE02\uD83D\uDE02<br>" +
                                        "그래도 도영이는 오늘도 잘 달림!!")
                                .tags(tagList3)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            }
        }

        SliceDto<PostDto> sliceDto = new SliceDto<>();
        sliceDto.setContent(postList);
        sliceDto.setPage(pageable.getPageNumber() + 1);
        sliceDto.setSize(pageable.getPageSize());
        sliceDto.setHasNext(postList.size() > pageable.getPageSize());

        PostListRes result = PostListRes.builder()
                .postList(sliceDto)
                .build();

        return new ResponseEntity<>(ResponseDto.success(MY_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/friends/{userId}")
    public ResponseEntity<?> friendPostList(
            @ModelAttribute FriendPostListReq friendPostReq,
            @PathVariable String userId,
            @PageableDefault(size = 10) Pageable pageable) {
        List<PostDto> postList = new ArrayList<>();

        List<String> tagList1 = new ArrayList<>();
        tagList1.add("김도영");
        tagList1.add("잠실");
        tagList1.add("기아");
        tagList1.add("도영이");

        List<String> tagList2 = new ArrayList<>();
        tagList2.add("최강야구");
        tagList2.add("몬스터즈");
        tagList2.add("이대호");
        tagList2.add("굿");

        List<String> tagList3 = new ArrayList<>();
        tagList3.add("SSG");
        tagList3.add("랜더스");
        tagList3.add("기아");
        tagList3.add("WIN");

        for (int i = 0; i < 9; i++) {
            if (i % 3 == 0) {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("테스트 게시글 아아아아아앙")
                                .tags(tagList1)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            } else if (i % 3 == 1) {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("기아는 왜 맨날 마트한테 지는걸까;;<br>" +
                                        "어제도 지고 오늘도 지네<br>" +
                                        "이마트랑 롯데한테 지는 거 열받아ㅠ")
                                .tags(tagList2)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            } else {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("오늘 잠실 야구장 다녀옴.<br>" +
                                        "비 맞으면서 야구 봤다ㅎ,,<br>" +
                                        "하지만 졌다\uD83D\uDE02\uD83D\uDE02<br>" +
                                        "그래도 도영이는 오늘도 잘 달림!!")
                                .tags(tagList3)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            }
        }

        SliceDto<PostDto> sliceDto = new SliceDto<>();
        sliceDto.setContent(postList);
        sliceDto.setPage(pageable.getPageNumber() + 1);
        sliceDto.setSize(pageable.getPageSize());
        sliceDto.setHasNext(postList.size() > pageable.getPageSize());

        PostListRes result = PostListRes.builder()
                .postList(sliceDto)
                .build();

        return new ResponseEntity<>(ResponseDto.success(FRIEND_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/likes")
    public ResponseEntity<?> likedPostList(
            @ModelAttribute LikedPostListReq likedPostListReq,
            @PageableDefault(size = 10) Pageable pageable) {
        List<PostDto> postList = new ArrayList<>();

        List<String> tagList1 = new ArrayList<>();
        tagList1.add("김도영");
        tagList1.add("잠실");
        tagList1.add("기아");
        tagList1.add("도영이");

        List<String> tagList2 = new ArrayList<>();
        tagList2.add("최강야구");
        tagList2.add("몬스터즈");
        tagList2.add("이대호");
        tagList2.add("굿");

        List<String> tagList3 = new ArrayList<>();
        tagList3.add("SSG");
        tagList3.add("랜더스");
        tagList3.add("기아");
        tagList3.add("WIN");

        for (int i = 0; i < 9; i++) {
            if (i % 3 == 0) {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("테스트 게시글 아아아아아앙")
                                .tags(tagList1)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            } else if (i % 3 == 1) {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("기아는 왜 맨날 마트한테 지는걸까;;<br>" +
                                        "어제도 지고 오늘도 지네<br>" +
                                        "이마트랑 롯데한테 지는 거 열받아ㅠ")
                                .tags(tagList2)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            } else {
                postList.add(
                        PostDto.builder()
                                .postId(i + 1L)
                                .profileImg("profile image url")
                                .nickname("테스트 유저 " + i)
                                .imageUrl("게시글 image url")
                                .contents("오늘 잠실 야구장 다녀옴.<br> " +
                                        "비 맞으면서 야구 봤다ㅎ,,<br> " +
                                        "하지만 졌다\uD83D\uDE02\uD83D\uDE02<br> " +
                                        "그래도 도영이는 오늘도 잘 달림!!")
                                .tags(tagList3)
                                .createdAt(LocalDate.now().minusDays(i))
                                .commentCount(i)
                                .build()
                );
            }
        }

        SliceDto<PostDto> sliceDto = new SliceDto<>();
        sliceDto.setContent(postList);
        sliceDto.setPage(pageable.getPageNumber() + 1);
        sliceDto.setSize(pageable.getPageSize());
        sliceDto.setHasNext(postList.size() > pageable.getPageSize());

        PostListRes result = PostListRes.builder()
                .postList(sliceDto)
                .build();

        return new ResponseEntity<>(ResponseDto.success(LIKED_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> postDetails(@PathVariable Long postId) {
        List<String> tagList = new ArrayList<>();
        tagList.add("기아");
        tagList.add("우승");
        tagList.add("기원");
        tagList.add("다꾸");

        PostDetailsRes result = PostDetailsRes.builder()
                .postId(1L)
                .profileImg("profile image url")
                .nickname("테스트 유저")
                .imageUrl("게시글 image url")
                .contents("게시글 내용~")
                .tags(tagList)
                .createdAt(LocalDate.now())
                .commentCount(5)
                .build();

        return new ResponseEntity<>(ResponseDto.success(POST_DETAILS_OK, result), HttpStatus.OK);
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<?> postModify(
            @PathVariable Long postId,
            @RequestPart(value = "dto", required = false) PostModifyReq postModifyReq,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        List<String> tagList = new ArrayList<>();
        tagList.add("게시글");
        tagList.add("수정");
        tagList.add("태그");
        tagList.add("다꾸");

        PostModifyRes result = PostModifyRes.builder()
                .contents("게시글 수정")
                .tags(tagList)
                .imageUrl("수정할 이미지 url")
                .build();

        return new ResponseEntity<>(ResponseDto.success(POST_MODIFIED, result), HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> postDelete(@PathVariable Long postId) {
        return new ResponseEntity<>(ResponseDto.success(POST_DELETED, null), HttpStatus.NO_CONTENT);
    }
}
