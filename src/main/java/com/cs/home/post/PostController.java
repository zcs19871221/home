package com.cs.home.post;

import com.cs.home.common.Response;
import com.cs.home.common.ValidationGroup;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/post")
public class PostController {


    private final PostService postService;


    @PostMapping("/save")
    public Response<PostPayload> save(@Validated(ValidationGroup.Create.class) @RequestBody PostPayload postPayload) {
        return Response.create(postService.save(postPayload));
    }


}
