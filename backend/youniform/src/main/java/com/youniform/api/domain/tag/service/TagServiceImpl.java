package com.youniform.api.domain.tag.service;

import com.youniform.api.domain.tag.dto.TagAdd;
import com.youniform.api.domain.tag.entity.Tag;
import com.youniform.api.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public List<Tag> addTagList(List<String> tags) {
        tags = replaceSpaces(tags);
        validationTag(tags);

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

    @Override
    @Transactional
    public List<Tag> updateTagList(List<String> tags) {
        tags = replaceSpaces(tags);
        validationTag(tags);

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

    private List<String> replaceSpaces(List<String> tags) {
        return tags.stream()
                .map(tag -> tag.replaceAll("\\s+", ""))
                .collect(Collectors.toList());
    }

    private void validationTag(List<String> tags) {
        InvalidTagSize(tags);
        InvalidTagContents(tags);
    }
}
