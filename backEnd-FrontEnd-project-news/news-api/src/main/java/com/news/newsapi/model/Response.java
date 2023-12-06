package com.news.newsapi.model;

import lombok.Data;
import java.util.List;
@Data
public class Response {

    private String status;
    private List<Source> sources;
}
