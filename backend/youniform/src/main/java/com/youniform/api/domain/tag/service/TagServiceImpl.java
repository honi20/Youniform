package com.youniform.api.domain.tag.service;

import com.youniform.api.domain.tag.dto.TagAdd;
import com.youniform.api.domain.tag.entity.Tag;
import com.youniform.api.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.youniform.api.domain.post.validation.PostValidation.InvalidTagContents;
import static com.youniform.api.domain.post.validation.PostValidation.InvalidTagSize;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    @Override
    public List<Tag> addTagList(List<String> tags) {
        InvalidTagSize(tags);
        InvalidTagContents(tags);

        List<Tag> existingTags = tagRepository.findByContentsIn(tags);
        Set<String> existingTagNames = existingTags.stream()
                .map(Tag::getContents)
                .collect(Collectors.toSet());

        List<Tag> newTags = tags.stream()
                .filter(tagName -> !existingTagNames.contains(tagName))
                .map(TagAdd::toEntity)
                .toList();

        tagRepository.saveAll(newTags);

        existingTags.addAll(newTags);

        return existingTags;
    }
}
