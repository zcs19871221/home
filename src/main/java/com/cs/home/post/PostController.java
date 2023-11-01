package com.cs.home.post;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@RequestMapping(path = "/post")
public class PostController {


    private PostService os1;


    @GetMapping("/order")
    public PostResponseDto list() {
        return os1.get();
    }
}
