package com.news.newsapi.controller;

import com.news.newsapi.model.Source;
import com.news.newsapi.service.NewsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1")
@CrossOrigin(value = "*")
public class NewsController {
    private final NewsService newsService;

    public NewsController(NewsService newsService) {

        this.newsService = newsService;
    }

    @GetMapping(value = "/news")
    public ResponseEntity<List<Source>> getSource(){
        return new ResponseEntity<>(newsService.getSources(), HttpStatus.OK);
    }
}
