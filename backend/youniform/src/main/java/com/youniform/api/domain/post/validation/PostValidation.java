package com.youniform.api.domain.post.validation;

import com.youniform.api.global.exception.CustomException;

import java.util.List;

import static com.youniform.api.global.statuscode.ErrorCode.INVALID_TAG_CONTENTS;
import static com.youniform.api.global.statuscode.ErrorCode.INVALID_TAG_SIZE;

public class PostValidation {
    public static void InvalidTagSize(List<String> tags) {
        if(tags.size() > 10) {
            throw new CustomException(INVALID_TAG_SIZE);
        }
    }

    public static void InvalidTagContents(List<String> tags) {
        tags.forEach(
                tag -> {
                    if(tag.length() > 10) {
                        throw new CustomException(INVALID_TAG_CONTENTS);
                    }
                }
        );
    }
}
