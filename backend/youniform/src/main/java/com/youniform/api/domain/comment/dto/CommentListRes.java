package com.youniform.api.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class CommentListRes {
    List<CommentListDto> commentList;

}
