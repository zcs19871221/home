package com.cs.home.tag;

import com.cs.home.common.Response;
import com.cs.home.common.ValidationGroup;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
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
    public Response<TagDto> createTag(@Valid @RequestBody TagDto tagPayload) {
        log.info("POST /api/tags ${}", tagPayload.getName());
        return Response.create(tagService.create(tagPayload));
    }

    @PutMapping
    public Response<TagDto> updateTag(@Validated(ValidationGroup.Update.class) @RequestBody TagDto tagPayload) {
        log.info("PUT /api/tags ${}", tagPayload.getName());
        return Response.create(tagService.update(tagPayload));
    }

    @DeleteMapping(path = "/{id}")
    public Response<String> delete(@PathVariable Integer id) {
        log.info("DELETE /api/tags/${}", id);
        tagService.delete(id);
        return Response.EmptyResponse();
    }

    @GetMapping
    public Response<List<TagDto>> findAll() {
        log.info("GET /api/tags");
        return Response.create(tagService.findAll());
    }


}
