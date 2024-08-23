package com.youniform.api.domain.news.controller;

import com.youniform.api.domain.news.service.NewsService;
import com.youniform.api.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.global.statuscode.SuccessCode.NEWS_LIST_OK;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private final NewsService newsService;

    @GetMapping
    public String getNews(@RequestParam String query) {
        return newsService.getNews(query);
    }
}
