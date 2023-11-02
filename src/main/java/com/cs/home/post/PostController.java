package com.cs.home.post;

import com.cs.home.common.Response;
import com.cs.home.common.ValidationGroup;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/post")
public class PostController {


    private final PostService postService;


    @PostMapping("/save")
    public Response<PostDto> save(@Validated(ValidationGroup.Create.class) @RequestBody PostDto postDto) {
        return Response.create(postService.save(postDto));
    }


}
