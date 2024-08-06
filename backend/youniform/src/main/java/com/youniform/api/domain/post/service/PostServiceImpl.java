package com.youniform.api.domain.post.service;

import com.youniform.api.domain.post.dto.PostAddReq;
import com.youniform.api.domain.post.dto.PostAddRes;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import static com.youniform.api.global.statuscode.ErrorCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final PostTagRepository postTagRepository;
    private final UserRepository userRepository;
    private final TagService tagService;
    private final S3Service s3Service;

    @Override
    public PostAddRes addPost(PostAddReq postAddReq, MultipartFile file, Long userId) throws IOException {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        log.info("111111 " + user.getUuid());
        if(postAddReq.getTags() == null) {
            postAddReq.updateEmptyTag();
        }

        List<Tag> tagList = tagService.addTagList(postAddReq.getTags());
        log.info("111111 " + String.valueOf(tagList.size()));
        Post post;

        if(file.isEmpty()) {
            post = postAddReq.toEntity(user, postAddReq.getContents());

        } else {
            String imgUrl = s3Service.upload(file, "post/"+ UUID.randomUUID());
            post = postAddReq.toEntity(user, imgUrl, postAddReq.getContents());
            log.info("111111 " + String.valueOf(post.getId()));
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
}
