package com.youniform.api.domain.tag.service;

import com.youniform.api.domain.tag.entity.Tag;

import java.util.List;

public interface TagService {
    public List<Tag> addTagList(List<String> tag);
}
