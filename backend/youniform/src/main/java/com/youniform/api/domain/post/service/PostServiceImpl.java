package com.youniform.api.domain.post.service;

import com.youniform.api.domain.post.dto.PostAddReq;
import com.youniform.api.domain.post.dto.PostAddRes;
import com.youniform.api.domain.post.dto.PostModifyReq;
import com.youniform.api.domain.post.dto.PostModifyRes;
import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.post.repository.PostRepository;
import com.youniform.api.domain.post_tag.entity.PostTag;
import com.youniform.api.domain.post_tag.entity.PostTagPK;
import com.youniform.api.domain.post_tag.repository.PostTagRepository;
import com.youniform.api.domain.tag.dto.TagDto;
import com.youniform.api.domain.tag.entity.Tag;
import com.youniform.api.domain.tag.service.TagService;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.youniform.api.global.statuscode.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final PostTagRepository postTagRepository;
    private final UserRepository userRepository;
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

        List<Tag> tagList = tagService.addTagList(postAddReq.getTags());

        Post post;

        if(file.isEmpty()) {
            post = postAddReq.toEntity(user, postAddReq.getContents());
        } else {
            String imgUrl = s3Service.upload(file, "post");
            post = postAddReq.toEntity(user, imgUrl, replaceEnter(postAddReq.getContents()));
        }

        postRepository.save(post);

        tagList.forEach(tag -> {
            postTagRepository.save(new PostTag(new PostTagPK(post.getId(), tag.getId()),
                    post, tag));
        });


        List<TagDto> tagDtoList = tagList.stream()
                .map(TagDto::toDto)
                .toList();

        return PostAddRes.toDto(post, tagDtoList, user.getUuid());
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

        List<TagDto> tagDtoList = new ArrayList<>();

        if(!file.isEmpty()) {
            if(!post.getImgUrl().isEmpty()) {
                s3Service.fileDelete(post.getImgUrl());
            }
            String imgUrl = s3Service.upload(file, "post");
            post.updateImgUrl(imgUrl);
        }

        if(postModifyReq.getTags() != null) {
            postTagRepository.deletePostTagsByPostId(post.getId());

            List<Tag> tagList = tagService.updateTagList(postModifyReq.getTags());

            tagList.forEach(tag -> {
                postTagRepository.save(new PostTag(new PostTagPK(post.getId(), tag.getId()),
                        post, tag));
            });

            tagDtoList = tagList.stream()
                    .map(TagDto::toDto)
                    .toList();
        }

        post.updateContents(replaceEnter(postModifyReq.getContents()));

        postRepository.save(post);

        return PostModifyRes.toDto(post, tagDtoList, user.getUuid());
    }

    @Override
    public void removePost(Long postId, Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        if(!post.getUser().getId().equals(userId)) {
            throw new CustomException(POST_DELETE_FORBIDDEN);
        }

        if(!post.getImgUrl().isEmpty()) {
            s3Service.fileDelete(post.getImgUrl());
        }

        postTagRepository.deletePostTagsByPostId(post.getId());
        postRepository.delete(post);
    }

    private String replaceEnter(String contents) {
        return contents.replaceAll("\\r?\\n", "<br/>");
    }
}
