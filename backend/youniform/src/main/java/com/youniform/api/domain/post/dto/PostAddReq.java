package com.youniform.api.domain.post.dto;

import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.user.entity.Users;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PostAddReq {
    @NotEmpty
    private String contents;

    private List<String> tags;

    public Post toEntity(Users user, String imgUrl, String contents) {
        return Post.builder()
                .contents(contents)
                .imgUrl(imgUrl)
                .user(user)
                .date(LocalDate.now())
                .build();
    }
}
