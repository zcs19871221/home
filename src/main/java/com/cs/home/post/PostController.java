package com.cs.home.post;

import com.cs.home.common.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/posts")
public class PostController {

    private final PostService postService;

    @PostMapping
    public Response<PostResponse> save(@Valid @RequestBody PostPayload postPayload) {
        return Response.create(postService.save(postPayload));
    }

    @GetMapping("/{id}")
    public Response<PostResponse> get(@PathVariable Integer id) {
        return Response.create(postService.get(id));
    }

    @PutMapping("/{id}")
    public Response<PostResponse> update(@Valid @RequestBody PostPayload postPayload, @PathVariable Integer id) {
        return Response.create(postService.update(id, postPayload));
    }

    @DeleteMapping("/{id}")
    public Response<String> delete(@PathVariable Integer id) {
        postService.delete(id);
        return Response.EmptyResponse();
    }
}
