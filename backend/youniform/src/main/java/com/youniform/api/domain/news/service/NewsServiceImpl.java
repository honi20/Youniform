package com.youniform.api.domain.news.service;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class NewsServiceImpl implements NewsService {
    @Override
    public String getNews(String query) {
        try {
            // HttpClient 생성
            HttpClient client = HttpClient.newHttpClient();

            // HttpRequest 생성
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://openapi.naver.com/v1/search/news.json?query="+query))
                    .GET() // 또는 POST, PUT 등
                    .header("Content-Type", "application/json")
                    .header("X-Naver-Client-Id", "PwdZFosPz79OKyNuA7O1")
                    .header("X-Naver-Client-Secret", "zL6ls62w17")
                    .build();

            // 요청 보내고 응답 받기
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // 응답 출력
            System.out.println(response.body());
            return response.body();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
