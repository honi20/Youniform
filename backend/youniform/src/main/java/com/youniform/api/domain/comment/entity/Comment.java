package com.youniform.api.domain.comment.entity;

import com.mongodb.lang.Nullable;
import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.user.entity.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    private String content;

    private LocalDateTime createdAt;

    @Nullable
    private LocalDateTime updatedAt;

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateUpdatedAt() {
        this.updatedAt = LocalDateTime.now();
    }
}
