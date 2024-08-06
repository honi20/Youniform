package com.youniform.api.domain.post.controller;

import com.youniform.api.domain.post.dto.*;
import com.youniform.api.domain.post.service.PostService;
import com.youniform.api.domain.tag.dto.TagDto;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.dto.SliceDto;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
        List<PostDto> postList = new ArrayList<>();

        List<TagDto> tagList1 = new ArrayList<>();
        tagList1.add(TagDto.builder()
                .tagId(1L)
                .contents("김도영")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(2L)
                .contents("잠실")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(3L)
                .contents("기아")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(4L)
                .contents("도영이최고")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(5L)
                .contents("도영이귀여워")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(6L)
                .contents("도영이홈런")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(7L)
                .contents("도영이안타")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(8L)
                .contents("도영이기아")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(9L)
                .contents("도영이잘한다")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(10L)
                .contents("도영이갓기")
                .build());


        List<TagDto> tagList2 = new ArrayList<>();
        tagList2.add(TagDto.builder()
                .tagId(11L)
                .contents("최강야구는언제하나요")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(12L)
                .contents("몬스터즈는누가제일인기가많나요")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(13L)
                .contents("이대호는도대체누구일까요")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(14L)
                .contents("굿굿굿입니다")
                .build());

        List<TagDto> tagList3 = new ArrayList<>();
        tagList3.add(TagDto.builder()
                .tagId(15L)
                .contents("SSG는신세계인데요")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(16L)
                .contents("랜더스는무슨뜻일까요")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(17L)
                .contents("기아는현재일등입니다")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(18L)
                .contents("아무나이겼으면좋겠다이기는팀우리팀")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(19L)
                .contents("집에가고싶어요집을보내주세요")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(20L)
                .contents("지금은팔월오일오후한시사십삼분집에가고싶어요")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(21L)
                .contents("지금은팔월오일한시사십사분임ㅋ")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(22L)
                .contents("오늘은야구가쉬는날입니다유감")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(23L)
                .contents("지금밖에비가살짝와요")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(24L)
                .contents("저창문열고왔는데어떡하죠내빨래으악")
                .build());

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
                                .userId(UUID)
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
                                .userId(UUID)
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
                                .userId(UUID)
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

        List<TagDto> tagList1 = new ArrayList<>();
        tagList1.add(TagDto.builder()
                .tagId(1L)
                .contents("김도영")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(2L)
                .contents("잠실")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(3L)
                .contents("기아")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(4L)
                .contents("도영이")
                .build());

        List<TagDto> tagList2 = new ArrayList<>();
        tagList2.add(TagDto.builder()
                .tagId(5L)
                .contents("최강야구")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(6L)
                .contents("몬스터즈")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(7L)
                .contents("이대호")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(8L)
                .contents("굿")
                .build());

        List<TagDto> tagList3 = new ArrayList<>();
        tagList3.add(TagDto.builder()
                .tagId(9L)
                .contents("SSG")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(10L)
                .contents("랜더스")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(11L)
                .contents("기아")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(12L)
                .contents("WIN")
                .build());

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
                                .userId(UUID)
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
                                .userId(UUID)
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
                                .userId(UUID)
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

        List<TagDto> tagList1 = new ArrayList<>();
        tagList1.add(TagDto.builder()
                        .tagId(1L)
                        .contents("김도영")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(2L)
                .contents("잠실")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(3L)
                .contents("기아")
                .build());
        tagList1.add(TagDto.builder()
                    .tagId(4L)
                    .contents("도영이")
                .build());

        List<TagDto> tagList2 = new ArrayList<>();
        tagList2.add(TagDto.builder()
                .tagId(5L)
                .contents("최강야구")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(6L)
                .contents("몬스터즈")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(7L)
                .contents("이대호")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(8L)
                .contents("굿")
                .build());

        List<TagDto> tagList3 = new ArrayList<>();
        tagList3.add(TagDto.builder()
                .tagId(9L)
                .contents("SSG")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(10L)
                .contents("랜더스")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(11L)
                .contents("기아")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(12L)
                .contents("WIN")
                .build());

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
                                .userId(UUID)
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
                                .userId(UUID)
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
                                .userId(UUID)
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

        List<TagDto> tagList1 = new ArrayList<>();
        tagList1.add(TagDto.builder()
                .tagId(1L)
                .contents("김도영")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(2L)
                .contents("잠실")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(3L)
                .contents("기아")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(4L)
                .contents("도영이")
                .build());

        List<TagDto> tagList2 = new ArrayList<>();
        tagList2.add(TagDto.builder()
                .tagId(5L)
                .contents("최강야구")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(6L)
                .contents("몬스터즈")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(7L)
                .contents("이대호")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(8L)
                .contents("굿")
                .build());

        List<TagDto> tagList3 = new ArrayList<>();
        tagList3.add(TagDto.builder()
                .tagId(9L)
                .contents("SSG")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(10L)
                .contents("랜더스")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(11L)
                .contents("기아")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(12L)
                .contents("WIN")
                .build());

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
                                .userId(UUID)
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
                                .userId(UUID)
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
                                .userId(UUID)
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

    @GetMapping("/tags")
    public ResponseEntity<?> tagPostList(
            @ModelAttribute TagPostReq tagPostReq,
            @PageableDefault(size = 10) Pageable pageable) {
        List<PostDto> postList = new ArrayList<>();

        List<TagDto> tagList1 = new ArrayList<>();
        tagList1.add(TagDto.builder()
                .tagId(1L)
                .contents("김도영")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(2L)
                .contents("힘차게날려라")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(3L)
                .contents("기아의승리를위하여")
                .build());
        tagList1.add(TagDto.builder()
                .tagId(4L)
                .contents("워어어어어어날려라")
                .build());

        List<TagDto> tagList2 = new ArrayList<>();
        tagList2.add(TagDto.builder()
                .tagId(5L)
                .contents("김도영")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(6L)
                .contents("안타")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(7L)
                .contents("홈런")
                .build());
        tagList2.add(TagDto.builder()
                .tagId(8L)
                .contents("고고")
                .build());

        List<TagDto> tagList3 = new ArrayList<>();
        tagList3.add(TagDto.builder()
                .tagId(9L)
                .contents("김도영")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(10L)
                .contents("잘한다")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(11L)
                .contents("홈런")
                .build());
        tagList3.add(TagDto.builder()
                .tagId(12L)
                .contents("멋쟁이")
                .build());

        for (int i = 0; i < 10; i++) {
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
                                .userId(UUID)
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
                                .userId(UUID)
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
                                .userId(UUID)
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

        return new ResponseEntity<>(ResponseDto.success(TAG_POST_LIST_OK, result), HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> postDetails(@PathVariable Long postId) {
        List<TagDto> tagList = new ArrayList<>();
        tagList.add(TagDto.builder()
                .tagId(1L)
                .contents("기아")
                .build());
        tagList.add(TagDto.builder()
                .tagId(2L)
                .contents("우승")
                .build());
        tagList.add(TagDto.builder()
                .tagId(3L)
                .contents("기원")
                .build());
        tagList.add(TagDto.builder()
                .tagId(4L)
                .contents("다꾸")
                .build());

        PostDetailsRes result = PostDetailsRes.builder()
                .postId(1L)
                .profileImg("profile image url")
                .nickname("테스트 유저")
                .imageUrl("게시글 image url")
                .contents("게시글 내용~")
                .tags(tagList)
                .createdAt(LocalDate.now())
                .commentCount(5)
                .userId(UUID)
                .build();

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
    public ResponseEntity<?> postDelete(@PathVariable Long postId) {
        return new ResponseEntity<>(ResponseDto.success(POST_DELETED, null), HttpStatus.OK);
    }
}
