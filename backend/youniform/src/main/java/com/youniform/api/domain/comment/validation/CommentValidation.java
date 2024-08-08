package com.youniform.api.domain.comment.validation;

import com.youniform.api.global.exception.CustomException;

import static com.youniform.api.global.statuscode.ErrorCode.COMMENT_UPDATE_FORBIDDEN;
import static com.youniform.api.global.statuscode.ErrorCode.INVALID_COMMENT_CONTENTS;

public class CommentValidation {
    public static void validateContents(String input) {
        if(input == null) {
            throw new CustomException(INVALID_COMMENT_CONTENTS);
        }

        String contents = input.replaceAll("\\s", "");

        if (contents.isEmpty()) {
            throw new CustomException(INVALID_COMMENT_CONTENTS);
        }
    }

    public static void validateMyComment(Long commentUserId, Long userId) {
        if(!commentUserId.equals(userId)) {
            throw new CustomException(COMMENT_UPDATE_FORBIDDEN);
        }
    }
}
