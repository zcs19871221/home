package com.cs.home.tag;

import com.cs.home.common.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(path = "/api/tags")
public class TagController {

    private final TagService tagService;

    @PostMapping
    public Response<TagResponse> createTag(@Valid @RequestBody TagPayload tagPayload) {
        log.info("POST /api/tags ${}", tagPayload.getName());
        return Response.create(tagService.create(tagPayload));
    }

    @PutMapping(path = "/{id}")
    public Response<TagResponse> updateTag(@Valid @RequestBody TagPayload tagPayload, @PathVariable int id) {
        log.info("PUT /api/tags ${}", tagPayload.getName());
        return Response.create(tagService.update(id, tagPayload));
    }

    @DeleteMapping(path = "/{id}")
    public Response<String> delete(@PathVariable Integer id) {
        log.info("DELETE /api/tags/${}", id);
        tagService.delete(id);
        return Response.EmptyResponse();
    }

    @GetMapping
    public Response<List<TagResponse>> findAll() {
        log.info("GET /api/tags");
        var result = tagService.findAll();
        return Response.create(result);
    }


}
