package com.news.newsapi.service;

import com.news.newsapi.model.Response;
import com.news.newsapi.model.Source;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.List;
import java.util.Objects;

@Service
public class NewsServiceImpl implements NewsService {

    private final RestTemplate restTemplate;

    @Value("${BASE_URL}")
    private String baseUrl;

    @Value("${NEWS_API_KEY}")
    private String apiKey;

    @Value("${LANGUAGE}")
    private String language;

    public NewsServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @Override
    public List<Source> getSources() {

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        String urlTemplate = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("language", language)
                .queryParam("apiKey", apiKey)
                .encode()
                .toUriString();
        HttpEntity<Response>responseHttpEntity= restTemplate.exchange(
                urlTemplate,
                HttpMethod.GET,
                requestEntity,
                Response.class
        );
           return Objects.requireNonNull(responseHttpEntity
                           .getBody())
                    .getSources();

    }
}
