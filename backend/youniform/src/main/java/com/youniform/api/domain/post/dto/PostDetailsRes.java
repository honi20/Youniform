package com.youniform.api.domain.post.dto;

import com.youniform.api.domain.comment.dto.CommentDto;
import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.tag.dto.TagDto;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class PostDetailsRes {
    private Long postId;

    private String userId;

    private String profileImg;

    private String nickname;

    private String imageUrl;

    private String contents;

    private List<TagDto> tags;

    private LocalDate createdAt;

    private Boolean isMyPost;

    private List<CommentDto> commentList;

    private Boolean isLiked;

    public static PostDetailsRes toDto(Post post, Users user, List<TagDto> tags, List<CommentDto> commentList, Boolean isMyPost, Boolean isLiked) {
        return PostDetailsRes.builder()
                .postId(post.getId())
                .profileImg(user.getProfileUrl())
                .nickname(user.getNickname())
                .imageUrl(post.getImgUrl())
                .contents(post.getContents())
                .tags(tags)
                .createdAt(post.getDate())
                .commentList(commentList)
                .userId(user.getUuid())
                .isMyPost(isMyPost)
                .isLiked(isLiked)
                .build();
    }
}
