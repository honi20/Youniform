package com.youniform.api.domain.tag.service;

import com.youniform.api.domain.tag.dto.TagListReq;
import com.youniform.api.domain.tag.dto.TagListRes;
import com.youniform.api.domain.tag.entity.Tag;

import java.util.List;

public interface TagService {
    List<Tag> addTagList(List<String> tag);
    List<Tag> updateTagList(List<String> tag);
    TagListRes findTags(TagListReq tagListReq);
}
