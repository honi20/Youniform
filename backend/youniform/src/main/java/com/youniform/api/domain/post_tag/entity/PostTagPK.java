package com.youniform.api.domain.post_tag.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostTagPK implements Serializable {
    private Long tagId;

    private Long postId;
}
