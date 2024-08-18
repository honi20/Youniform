package com.youniform.api.domain.post.service;

import com.youniform.api.domain.comment.dto.CommentDto;
import com.youniform.api.domain.comment.repository.CommentRepository;
import com.youniform.api.domain.like_post.repository.LikePostRepository;
import com.youniform.api.domain.post.dto.*;
import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.post.repository.PostRepository;
import com.youniform.api.domain.post_tag.entity.PostTag;
import com.youniform.api.domain.post_tag.entity.PostTagPK;
import com.youniform.api.domain.post_tag.repository.PostTagRepository;
import com.youniform.api.domain.tag.dto.TagDto;
import com.youniform.api.domain.tag.entity.Tag;
import com.youniform.api.domain.tag.repository.TagRepository;
import com.youniform.api.domain.tag.service.TagService;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.youniform.api.global.statuscode.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final PostTagRepository postTagRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final CommentRepository commentRepository;
    private final LikePostRepository likePostRepository;
    private final TagService tagService;
    private final S3Service s3Service;


    @Override
    @Transactional
    public PostAddRes addPost(PostAddReq postAddReq, MultipartFile file, Long userId) throws IOException {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        if(postAddReq.getTags() == null) {
            postAddReq.updateEmptyTag();
        }

        Post post;

        if(file.isEmpty()) {
            post = postAddReq.toEntity(user, postAddReq.getContents());
        } else {
            String imgUrl = s3Service.upload(file, "post");
            post = postAddReq.toEntity(user, imgUrl, replaceEnter(postAddReq.getContents()));
        }

        postRepository.save(post);

        List<Tag> tagList = tagService.addTagList(postAddReq.getTags());

        tagList.forEach(tag -> {
            postTagRepository.save(new PostTag(new PostTagPK(post.getId(), tag.getId()),
                    post, tag));
        });

        return PostAddRes.toDto(post);
    }

    @Override
    @Transactional
    public PostModifyRes modifyPost(PostModifyReq postModifyReq, MultipartFile file, Long postId, Long userId) throws IOException {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        if(!post.getUser().getId().equals(userId)) {
            throw new CustomException(POST_UPDATE_FORBIDDEN);
        }

        if(file != null) {
            if(post.getImgUrl() != null && !post.getImgUrl().isEmpty()) {
                s3Service.fileDelete(post.getImgUrl());
                post.updateImgUrl(null);
            }
            if(!file.isEmpty()) {
                String imgUrl = s3Service.upload(file, "post");
                post.updateImgUrl(imgUrl);
            }
        }

        if(postModifyReq.getTags() != null) {
            postTagRepository.deletePostTagsByPostId(post.getId());

            List<Tag> tagList = tagService.updateTagList(postModifyReq.getTags());

            tagList.forEach(tag -> {
                postTagRepository.save(new PostTag(new PostTagPK(post.getId(), tag.getId()),
                        post, tag));
            });
        }

        post.updateContents(replaceEnter(postModifyReq.getContents()));

        postRepository.save(post);

        return PostModifyRes.toDto(post);
    }

    @Override
    @Transactional
    public void removePost(Long postId, Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        if(!post.getUser().getId().equals(userId)) {
            throw new CustomException(POST_DELETE_FORBIDDEN);
        }

        if(post.getImgUrl() != null && !post.getImgUrl().isEmpty()) {
            s3Service.fileDelete(post.getImgUrl());
        }

        commentRepository.deleteAllByPostId(post.getId());
        postTagRepository.deletePostTagsByPostId(post.getId());
        likePostRepository.deleteAllByPostId(post.getId());
        postRepository.delete(post);
    }

    @Override
    public PostDetailsRes findPost(Long postId, Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        List<TagDto> tags = tagRepository.findTagsByPostId(postId)
                .stream()
                .map(TagDto::toDto)
                .toList();

        List<CommentDto> commentList = commentRepository.findCommentsByPostId(postId)
                .stream()
                .map(CommentDto::toDto)
                .toList();

        Boolean isMine = post.getUser().getId().equals(userId);
        Boolean isLiked = likePostRepository.isLikedPost(postId);

        return PostDetailsRes.toDto(post, tags, commentList, isMine, isLiked);
    }

    @Override
    public PostListRes findPublicPosts(Long userId, PublicPostListReq publicPostListReq, Pageable pageable) {
        Slice<PostDto> posts = postRepository.findPostByCursor(userId, publicPostListReq.getLastPostId(), pageable);

        SliceDto<PostDto> postDtoSliceDto = new SliceDto<>(posts);
        return PostListRes.toDto(postDtoSliceDto);
    }

    @Override
    public PostListRes findMyPosts(Long userId, MyPostListReq myPostListReq, Pageable pageable) {
        Slice<PostDto> posts = postRepository.findMyPostByCursor(userId, myPostListReq.getLastPostId(), pageable);

        SliceDto<PostDto> postDtoSliceDto = new SliceDto<>(posts);
        return PostListRes.toDto(postDtoSliceDto);
    }

    @Override
    public PostListRes findFriendPost(Long userId, String friendId, FriendPostListReq friendPostListReq, Pageable pageable) {
        Users user = userRepository.findByUuid(friendId)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));


        Slice<PostDto> posts = postRepository.findFriendPostByCursor(userId, friendId, friendPostListReq.getLastPostId(), pageable);

        SliceDto<PostDto> postDtoSliceDto = new SliceDto<>(posts);
        return PostListRes.toDto(postDtoSliceDto);
    }

    @Override
    public PostListRes findLikedPost(Long userId, LikedPostListReq likedPostListReq, Pageable pageable) {
        Slice<PostDto> posts = postRepository.findLikedPostByCursor(userId, likedPostListReq.getLastPostId(), pageable);

        SliceDto<PostDto> postDtoSliceDto = new SliceDto<>(posts);
        return PostListRes.toDto(postDtoSliceDto);
    }

    @Override
    public PostListRes findTagPost(Long userId, TagPostReq tagPostReq, Pageable pageable) {
        Slice<PostDto> posts = postRepository.findTagPostByCursor(userId, tagPostReq.getTagId(),
                tagPostReq.getLastPostId(), pageable);

        SliceDto<PostDto> postDtoSliceDto = new SliceDto<>(posts);
        return PostListRes.toDto(postDtoSliceDto);
    }

    private String replaceEnter(String contents) {
        return contents.replaceAll("\\r?\\n", "<br/>");
    }
}
